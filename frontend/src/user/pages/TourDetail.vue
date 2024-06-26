<script setup>
import { onMounted,onUnmounted , computed, ref,watchEffect  } from 'vue';
import { useRoute,useRouter  } from 'vue-router';
import { useStore } from 'vuex';
import PaginateApp from '../components/PaginateApp.vue'
const backendBaseUrl = 'http://localhost:8000';

const store = useStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const adults = ref(0);
const children = ref(0);
const priceForAdults = ref(0);
const priceForChildren = ref(0);

const rating = ref(0);
const hoverRating = ref(0);
const stars = [1,2,3,4,5];

const currentPage = ref(1);
const reviewsPerPage = 8;


const review = ref({
  username: '',
  email: '',
  phone: '',
  reviewText: '',
});

onMounted(async () => {
    if (id) {
        try {
            await store.dispatch('tour/getSingleTour', id);
        } catch (error) {
            console.error('Error fetching single tour:', error);
        }
    } else {
        console.error('ID parameter is missing');
    }
});

const tour = computed(() => store.state.tour.singleTour);

//Tính phần trăm cho mức sao bất kỳ
const calculateStarPercentage = (star) => {
    const reviews = tour.value.reviews;
    if(!tour.value || !reviews || reviews.length === 0) return 0;
    const totalReviews = reviews.length;
    const starReviews = reviews.filter(review => review.rating === star).length;
    return Math.round((starReviews / totalReviews) * 100);
};


// Tạo đánh giá
const createReview = async () => {
  try {
    const reviewData = {
      ...review.value,
      rating: rating.value
    };

    // Gửi yêu cầu tạo đánh giá bằng cách dispatch action từ store
    await store.dispatch('review/createReview', { TourId: id, reviewData });

    // Sau khi thành công, làm sạch các trường dữ liệu
    review.value.username = '';
    review.value.phone = '';
    review.value.email = '';
    review.value.reviewText = '';
    rating.value = 0;
    hoverRating.value = 0;

    // Tải lại trang để cập nhật dữ liệu
    window.location.reload();
  } catch (error) {
    console.error('Error creating review:', error);
  }
};

//Lấy hình ảnh
const getTourPhotoUrl = (photos) => {
    if (photos) {
        return `${backendBaseUrl}${photos.split('\\').join('/')}`;
    } else {
        return `${backendBaseUrl}/images/tour/default.jpg`;
    }
};

//Tính trung bình đánh giá
const getAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

watchEffect(() => {
    if (tour.value) {
        priceForAdults.value = tour.value.priceForAdults;
        priceForChildren.value = tour.value.priceForChildren;
    }
});
const incrementAdults = () => {
    if (adults.value < 100) {
        adults.value++;
    }
};
const decrementAdults = () => {
    if (adults.value > 0) {
        adults.value--;
    }
};
const incrementChildren = () => {
    if (children.value < 100) {
        children.value++;
    }
};
const decrementChildren = () => {
    if (children.value > 0) {
        children.value--;
    }
};

//định dạng hiển thị tiền
const formatPrice = (value) => {
      return new Intl.NumberFormat('vi-VN').format(value);
};

//Tính tổng tiền
const total = computed(() =>{
    const totalAmount = adults.value*priceForAdults.value + children.value*priceForChildren.value;
  return totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
});

const canSubmit = computed(() =>{
    return selectedDate.value && (adults.value > 0 || children.value > 0);
})

//Cập nhật ngày hiện tại
const selectedDate = ref(null);

//Xóa tất cả lựa chọn
const clearAllOption = () =>{
    adults.value = 0;
    children.value = 0;
    selectedDate.value = null;
}
//Định dạng giờ
// const formatHour = (input) =>{
//     const hour = Math.floor(input);
//     const minute = Math.round((input - hour) * 60);

//     const formattedHour = hour.toString().padStart(2,'0');
//     const formattedMinute = minute.toString().padStart(2,'0');

//     return `${formattedHour}:${formattedMinute}`;
// }

//Định dạng ngày
const formattedDate = (inputDate) =>{
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

//Đánh giá sao
const setRating = (newRating) => {
  rating.value = newRating;
}
const setHoverRating = (newRating) => {
  hoverRating.value = newRating;
}

//tạo phân trang
const paginatedReviews = computed(() => {
    const start = (currentPage.value -1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    return tour.value.reviews.slice(start, end)
});

const activeSection = ref('');

const scrollToSection = (targetId, event) => {
  event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth'
    });
  }
};

const handleScroll = () => {
  const service = document.getElementById('service');
  const introduce = document.getElementById('introduce');
  const evaluate = document.getElementById('evaluate');
  const evaluteForm = document.getElementById('evaluteForm');

  if (evaluate && evaluate.getBoundingClientRect().top <= window.innerHeight * 0.5) {
    activeSection.value = 'evaluate';
  } else if (introduce && introduce.getBoundingClientRect().top <= window.innerHeight * 0.5) {
    activeSection.value = 'introduce';
  } else if (service && service.getBoundingClientRect().top <= window.innerHeight * 0.5) {
    activeSection.value = 'service';
  } else if (evaluteForm && evaluteForm.getBoundingClientRect().top <= window.innerHeight * 0.5) {
    activeSection.value = 'evaluteForm';
  } else {
    activeSection.value = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const submitBooking = async () => {
    const bookingInfo = {
    selectedDate: selectedDate.value,
    numAdults: adults.value,
    numChildren: children.value,
    totalAmount: total.value
  };

  try {
    await store.dispatch('booking/updateBookingInfo', bookingInfo);
    router.push({ path: `/tour-booking/${tour.value._id}` });
  } catch (error) {
    console.error('Failed to update booking info:', error);
  }
  };
</script>


<template>
    <div v-if="tour" class="mt-24" id="ToutDetail">
        <div class="mx-auto w-3/4 flex justify-between">
            <div class="w-3/5 ">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ tour.title }}</h1>
                <div class="mt-2">
                    <span class="bg-gray-200 px-2 py-1 rounded-md mr-2 font-semibold text-sm text-gray-600">Tiếng Anh/Tiếng Việt</span>
                    <span class="bg-gray-200 px-2 py-1 rounded-md mr-2 font-semibold text-sm text-gray-600">Tùy chọn đón tại khách sạn</span>
                    <span class="bg-gray-200 px-2 py-1 rounded-md mr-2 font-semibold text-sm text-gray-600">Thời lượng: {{ tour.tourTime }} giờ</span>
                </div>
                <p class="text-xl mt-2 font-semibold text-gray-700"><font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300"/> <span class="text-yellow-300">{{ getAverageRating(tour.reviews) }}</span> (<a href = "#" @click="scrollToSection('evaluate',$event)" class = "text-lg cursor-pointer hover:underline">{{ tour.reviews.length }} đánh giá</a> )</p>
            </div>
            <div class="">
                <p class="text-4xl font-bold text-secondary">{{ formatPrice(tour.priceForAdults) }}<span> đ</span> / Khách</p>
            </div>
        </div>

        <div class="w-3/4 mx-auto flex  mt-8">
            <div class="grid gap-4 grid-flow-col grid-cols-12 w-full">

                <div class="col-span-8">
                    <img class="h-96 w-full rounded-lg " :src="getTourPhotoUrl(tour.photos[0])" :alt="tour.title">
                </div>
                <div class="grid row-span-1 gap-4 col-span-4">
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="getTourPhotoUrl(tour.photos[1])" :alt="tour.title">
                    </div>
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="getTourPhotoUrl(tour.photos[2])" :alt="tour.title">
                    </div>
                </div>
               
            </div>

        </div>
        <div class="sticky top-[68px] bg-white z-20 transition-all duration-300 ease-in-out">
            <div class="w-3/4 mx-auto mt-12">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-200 rounded-lg p-2" >
                    <li class="me-2">
                        <a href="#" @click="scrollToSection('service',$event)" 
                        :class="{ 'inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100': activeSection !== 'service',
                                'inline-block px-4 py-2 rounded-lg text-gray-900 bg-gray-100': activeSection === 'service' }">
                                    Gói dịch vụ</a>
                    </li>
                    <li class="me-2">
                        <a href="#" @click="scrollToSection('introduce',$event)" 
                        :class="{ 'inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100': activeSection !== 'seintroducervice',
                                'inline-block px-4 py-2 rounded-lg text-gray-900 bg-gray-100': activeSection === 'introduce' }">
                                Giới thiệu</a>
                    </li>
                    <li class="me-2">
                        <a href="#" @click="scrollToSection('evaluate',$event)" 
                        :class="{ 'inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100': activeSection !== 'evaluate',
                                'inline-block px-4 py-2 rounded-lg text-gray-900 bg-gray-100': activeSection === 'evaluate' }">Đánh giá</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-3/4 mx-auto flex">
            <div class="w-2/3 mr-4">
                <!-- Gói dịch vụ -->
                <div id="service" class="pt-12">
                    <h1 class="text-3xl font-bold">Gói dịch vụ</h1>
                    <div class="w-full bg-gray-300 p-5 rounded-xl mt-8">
                        <div class="">
                            <div class="flex justify-between items-center">
                                <p class="text-xl font-semibold text-gray-800">Thông tin gói dịch vụ</p>
                                <p @click = "clearAllOption" class="cursor-pointer font-semibold text-gray-900 hover:text-secondary">Xóa tất cả</p>
                            </div>
                            <h3 class="text-gray-600 text-sm mt-4">Xin chọn ngày tham gia</h3>
                            <div class="relative max-w-sm mt-2">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input v-model="selectedDate" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block  ps-10 p-2.5 ">
                            </div>

                            <h3 class="text-gray-600 text-sm mt-4 ">Số lượng</h3>
                            <div class="mt-2 flex justify-between items-center px-4 py-2 bg-white rounded-md">
                                <p class="font-semibold text-gray-900">Người lớn</p>
                                <div class="flex items-center">
                                    <p class="text-gray-900 mr-3 font-semibold">{{ formatPrice(tour.priceForAdults) }}<span>đ</span></p>
                                        <div class="relative flex items-center max-w-32">
                                                <button @click="decrementAdults" type="button" id="decrement-button" data-input-counter-decrement="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                                    </svg>
                                                </button>
                                                <input type="text" id="adults-input" class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full " placeholder="0" value="0" v-model="adults" required />
                                                
                                                <button @click="incrementAdults" type="button" id="increment-button" data-input-counter-increment="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                    
                                </div>
                            </div>
                            <div v-if="tour.priceForChildren > 0 " class="mt-2 flex justify-between items-center px-4 py-2 bg-white rounded-md ">
                                <p class="font-semibold text-gray-900">Trẻ em(5-8)</p>
                                <div class="flex items-center">
                                    <p class="text-gray-900 mr-3 font-semibold">{{ formatPrice(tour.priceForChildren)}}<span>đ</span></p>
                                    
                                            <div class="relative flex items-center max-w-32">
                                                <button @click="decrementChildren" type="button" id="decrement-button" data-input-counter-decrement="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                                    </svg>
                                                </button>

                                                <input type="text" id="people-input" class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full " value="0"  v-model = "children" required />
                                                
                                                <button @click="incrementChildren" type="button" id="increment-button" data-input-counter-increment="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                   
                                </div>
                                
                            </div>
                            <div class="mt-8 px-4 flex justify-between items-center ">
                                <div class="">
                                    <p class="text-gray-900 text-sm">Tổng tiền</p>
                                    <p class="text-2xl text-secondary">{{ total }}</p>
                                </div>
                                <button @click = "submitBooking"
                                    :disabled="!canSubmit" 
                                    :class="['px-5 py-3 text-sm font-medium text-center  rounded-xl shadow-3xl transition-colors duration-300 ease-in-out', canSubmit ? 'bg-primary hover:bg-secondary text-secondary hover:text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed']"
                                >Đặt ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Giới thiệu -->
                <div id= "introduce" class="pt-12">
                    <div>
                        <h3 class="text-3xl font-bold">Giới thiệu</h3>
                        <div class=" mt-8">
                            <p class="">{{ tour.desc }}
                            </p>
                        </div>
                    </div>
                </div>
               
                <!-- Đánh giá -->
                <div id="evaluate" class="pt-12">
                    <!--Form đánh giá-->
                    <div>
                        <div class="flex items-center justify-between">
                            <h3 class="text-3xl font-bold">Đánh giá ({{ tour.reviews.length }})</h3>
                            <a href="#" @click="scrollToSection('evaluteForm',$event)" class=" px-8 py-2 text-lg font-medium text-center text-secondary bg-primary rounded-xl shadow-3xl hover:text-white hover:bg-secondary transition-colors duration-200 ease-in-out cursor-pointer">Gửi đánh giá</a>
                        </div>
                        <div class="mt-12">
                            <div class="flex w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl px-2 py-4">
                                <div class="w-1/3 text-center my-auto">
                                    <p class="text-yellow-300 text-5xl font-bold flex items-center justify-center">{{ getAverageRating(tour.reviews) }} <font-awesome-icon :icon="['fas', 'star']" class="text-3xl ml-2"/></p>
                                     
                                </div>
                                <span class="h-32 w-[1px] bg-gray-400 block my-auto mr-12"></span>
                                <div class="w-2/3">
                                    <div class="flex items-center ">
                                        <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 sao</a>
                                        <div class="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                            <div class="h-3 bg-yellow-300 rounded" :style="{ width: `${calculateStarPercentage(5)}%` }" ></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {{ calculateStarPercentage(5) }} %
                                        </span>
                                    </div>
                                    <div class="flex items-center mt-3">
                                        <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 sao</a>
                                        <div class="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                            <div class="h-3 bg-yellow-300 rounded" :style="{ width: `${calculateStarPercentage(4)}%` }"></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {{ calculateStarPercentage(4) }} %
                                        </span>
                                    </div>
                                    <div class="flex items-center mt-3">
                                        <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 sao</a>
                                        <div class="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                            <div class="h-3 bg-yellow-300 rounded" :style="{ width: `${calculateStarPercentage(3)}%` }"></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {{ calculateStarPercentage(3) }} %
                                        </span>
                                    </div>
                                    <div class="flex items-center mt-3">
                                        <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 sao</a>
                                        <div class="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                            <div class="h-3 bg-yellow-300 rounded" :style="{ width: `${calculateStarPercentage(2)}%` }"></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {{ calculateStarPercentage(2) }} %
                                        </span>
                                    </div>
                                    <div class="flex items-center mt-3">
                                        <a href="#" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 sao</a>
                                        <div class="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                            <div class="h-3 bg-yellow-300 rounded" :style="{ width: `${calculateStarPercentage(1)}%` }"></div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {{ calculateStarPercentage(1) }} %
                                        </span>
                                    </div>   
                                </div>
                            </div>
                            <div class="mt-12" ref="reviewsContainer">
                                <div v-for="(review,index) in paginatedReviews" :key="index" class="w-full border border-gray-300 text-gray-900 shadow-lg rounded-3xl p-4 mt-5">
                                    <p class="flex">
                                        <svg v-for="(star, index) in review.rating " :key="index" class="w-5 h-5 ms-1 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    </p>
                                    <p class="text-xl font-medium text-gray-900 mt-3 ml-1">{{ review.username }}</p>
                                    <p class="text-sm font-medium mt-3 text-gray-600 ml-1">{{ review.reviewText }}</p>
                                    <p class="text-gray-700 mt-3 ml-1">{{ formattedDate(review.createdAt) }}</p>
                                </div>
                                <div class="mt-10 flex justify-center">
                                    <PaginateApp
                                        :totalItems="tour.reviews.length"
                                        :itemsPerPage="reviewsPerPage"
                                        v-model:modelValue="currentPage"
                                        @scroll-to-top = "scrollToTop"
                                    />
                                </div>
                            </div>
                            <span class="block w-3/4 mx-auto h-[1px] bg-primary my-12"></span>
                                <div id ="evaluteForm" class="pt-12">
                                    <form  @submit.prevent="createReview" class="">
                                        <div class="mb-5 flex justify-between">
                                            <div class="w-1/2 mx-2">
                                                <label for="rating" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Chất lượng</label>
                                                <div class="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full w-full px-2 py-2">
                                                    <svg
                                                        v-for="(star, index) in stars"
                                                        :key="index"
                                                        class="w-7 h-7 ms-3 cursor-pointer transition duration-200 ease-in-out transform"
                                                        :class="{'text-yellow-300': index < hoverRating || index < rating, 'text-gray-300': index >= hoverRating && index >= rating}"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 22 20"
                                                        @mouseover="setHoverRating(index + 1)"
                                                        @mouseleave="setHoverRating(0)"
                                                        @click="setRating(index + 1)"
                                                        >
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="w-1/2 mx-2">
                                                <label for="username" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                                <input v-model = "review.username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập họ và tên" required />
                                            </div>
                                        </div>
                                        <div class="mb-5 flex justify-between">
                                            <div class="w-1/2 mx-2">
                                                <label for="phone" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                                <input v-model = "review.phone" type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại" required />
                                            </div>
                                            <div class="w-1/2 mx-2">
                                                <label for="email" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ email</label>
                                                <input v-model = "review.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập email" required />
                                            </div>
                                        </div>
                                        <div class="mx-2">
                                                <label for="reviewText" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Nhận xét của bạn</label>
                                                <textarea v-model = "review.reviewText"  type="text" id="reviewText" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhận xét của bạn" required ></textarea>
                                        </div>
                                        <div class="flex justify-end ">
                                            <button type = "submit" class="md:mr-4 mt-5 px-8 py-2 text-lg font-medium text-center text-secondary bg-primary rounded-xl shadow-3xl hover:text-white hover:bg-secondary transition-colors duration-300 ease-in-out ">Gửi
                                            </button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/3 ml-4 mt-28">
                <div class="relative bg-gray-300 p-5 rounded-xl ">
                    <div class="absolute top-5 -left-7 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] border-t-[15px] border-transparent border-r-gray-300"></div>
                    <div class="text-xl font-semibold text-gray-800">Chi tiết gói dịch vụ</div>
                    <div class="">
                        <div class="">
                            <h2 class="text-lg font-semibold text-gray-800 mt-2">Lịch trình.</h2>
                            <p class="">Thời lượng: {{ tour.tourTime}} giờ</p>
                            <div class="mt-2" >
                               <p class="font-semibold text-gray-900"><font-awesome-icon class="text-primary mx-1" :icon="['fas', 'location-dot']" /> Khởi hành </p>
                               <p class="px-2 ml-2 font-medium text-gray-800">Cho biết thời gian bắt đầu mong muốn của bạn khi thanh toán (thời gian sớm nhất lúc 8:00, muộn nhất lúc 18:00)</p>
                               <ul class="my-2">
                                    <li class="list-disc ml-7 py-1 text-sm font-semibold text-gray-700 cursor-pointer hover:underline hover:text-gray-900" v-for="(destination, index) in tour.destinations" :key="index" >
                                        <span class=""> {{ destination }}</span>
                                    </li>
                                    
                                </ul>
                               <p class="font-semibold text-gray-900"><font-awesome-icon class="text-primary mx-1" :icon="['fas', 'location-dot']" />Kết thúc </p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h2 class="text-lg font-semibold text-gray-800 ">Thông tin tập trung / đón khách.</h2>
                            <h4 class="text-gray-800 font-semibold ml-2 mt-2">Thời gian được xác định sau khi đặt</h4>
                            <p class="mx-4"><span class="text-gray-900 font-medium">- Đưa đón miễn phí tại :</span> {{ tour.pickupLocation }}. Nếu khách sạn của bạn nằm ngoài khu vực đón, nhà điều hành sẽ thông báo về phụ phí hoặc địa điểm tập trung.</p>
                            <h4 class="text-gray-800 font-semibold ml-2 mt-2">Văn phòng điều hành.</h4>
                            <p class="mx-4"><span class="text-gray-900 font-medium">- Địa chỉ:</span> {{ tour.executiveOffice }}</p>
                            <h4 class="text-gray-800 font-semibold ml-2 mt-2">Lưu ý <span class="text-red-700">*</span>.</h4>
                            <p class="mx-4 text-gray-700">- Vui lòng đến điểm xuất phát trước giờ khởi hành 10 phút.</p>
                            <p class="mx-4 text-gray-700">- Không hoàn tiền cho khách đến trễ hoặc vắng mặt.</p>
                            <p class="mx-4 text-gray-700">- Nhập tên và địa chỉ khách sạn của bạn ở trang thanh toán.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>




