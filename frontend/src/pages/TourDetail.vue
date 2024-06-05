<script setup>
import { onMounted, computed, ref,watchEffect  } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const id = route.params.id;

const adults = ref(0);
const children = ref(0);
const priceForAdults = ref(0);
const priceForChildren = ref(0);


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

const tour = computed(() => {
  return store.state.tour.singleTour;
});
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
    if (adults.value < 20) {
        adults.value++;
    }
};
const decrementAdults = () => {
    if (adults.value > 0) {
        adults.value--;
    }
};
const incrementChildren = () => {
    if (children.value < 20) {
        children.value++;
    }
};
const decrementChildren = () => {
    if (children.value > 0) {
        children.value--;
    }
};

//Tính tổng tiền
const total = computed(() =>{
    const totalAmount = adults.value*priceForAdults.value + children.value*priceForChildren.value;
  return totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
});

//Cập nhật ngày hiện tại
const selectedDate = ref(new Date().toISOString().substring(0, 10));

//Xóa tất cả lựa chọn
const clearAllOption = () =>{
    adults.value = 0;
    children.value = 0;
    selectedDate.value = new Date().toISOString().substring(0, 10);
}
</script>


<template>
    <div v-if="tour" class="mt-24" id="ToutDetail">
        <div class="mx-auto w-3/4 flex justify-between px-8">
            <div class="">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ tour.title }}</h1>
                <p class="text-xl mt-2"><font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300"/> <span class="text-yellow-300">{{ getAverageRating(tour.reviews) }}</span> (<span>{{ tour.reviews.length }}</span> đánh giá)</p>
            </div>
            <div class="">
                <p class="text-4xl font-bold text-secondary">{{ tour.priceForAdults }}<span> đ</span> / Khách</p>
            </div>
        </div>

        <div class="w-3/4 mx-auto flex justify-center mt-8">
            <div class="grid gap-4 grid-flow-col grid-cols-12">

                <div class="col-span-6">
                    <img class="h-96 w-full rounded-lg " :src="tour.photo" :alt="tour.title">
                </div>
                <div class="grid row-span-1 gap-4 col-span-3">
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="tour.photo" :alt="tour.title">
                    </div>
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="tour.photo" :alt="tour.title">
                    </div>
                </div>
                <div class="grid row-span-1 gap-4 col-span-3">
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="tour.photo" :alt="tour.title">
                    </div>
                    <div>
                        <img class="h-[184px] w-full rounded-lg" :src="tour.photo" :alt="tour.title">
                    </div>
                </div>
            </div>

        </div>

        <div class="w-3/4 mx-auto mt-12">
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-200 rounded-lg p-2" >
                <li class="me-2">
                    <a href="#" class="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 ">Đặc điểm</a>
                </li>
                <li class="me-2">
                    <a href="#"  class="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 ">Gói dịch vụ</a>
                </li>
                <li class="me-2">
                    <a href="#" class="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 ">Giới thiệu</a>
                </li>
                <li class="me-2">
                    <a href="#" class="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 ">Quy định</a>
                </li>
                <li class="me-2">
                    <a href="#" class="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 ">Đánh giá</a>
                </li>
            </ul>
        </div>
        <!-- Đặc điểm nổi bật -->
        <div id="characteristic" class="w-3/4 mx-auto mt-10">
            <h1 class="text-3xl font-bold">Đặc điểm nổi bật</h1>
            <div class="w-3/4">
                <div class="flex justify-between mx-2 mt-6">
                    <div class="w-1/2 ">
                        <ul class="">
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary mr-2"/>Vào cửa các điểm tham quan</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary mr-2"/>Bữa trưa</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary mr-2"/>Nước uống đóng chai</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary mr-2"/>Bảo hiểm do nhà điều hành cung cấp</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-check']" class="text-primary mr-2"/>Trung chuyển bằng xe buýt trong tour</li>
                        </ul>
                    </div>
                    <div class="w-1/2">
                        <ul class="">
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="text-gray-800 mr-2"/>Đồ uống cho bữa trưa</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="text-gray-800 mr-2"/>Tiền típ</li>
                            <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'circle-xmark']" class="text-gray-800 mr-2"/>Chi phí cá nhân khác</li>
                        </ul>
                    </div>
                </div>
                <ul class="mx-2 mt-8">
                    <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary" />Ghé thăm những địa danh tuyệt nhất Hà Nội với tour trong một ngày</li>
                    <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary" />Viếng nơi an nghỉ cuối cùng của Chủ Tịch Hồ Chí Minh ở Lăng Bác
                    </li>
                    <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary" />Ngắm những ngôi chùa tuyệt đẹp của thành phố: Chùa Trấn Quốc và Chùa Một Cột</li>
                    <li class="text-gray-900 font-medium mt-4"><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary" />Khám phá phong cảnh thiên nhiên tuyệt vời dọc theo Hồ Hoàn Kiếm, tham quan Văn Miếu Quốc Tử Giám và di tích nhà tù Hoả Lò hoặc Bảo tàng phụ nữ Việt Nam</li>
                </ul>
            </div>
        </div>
        <!-- Gói dịch vụ -->
        <div id="service" class="w-3/4 mx-auto mt-10">
            <h1 class="text-3xl font-bold">Gói dịch vụ</h1>
            <div class="w-[60%] bg-gray-300 p-5 rounded-xl mt-6">
                <div class="">
                    <div class="flex justify-between items-center">
                        <p class="text-xl font-semibold text-gray-900">Thông tin gói dịch vụ</p>
                        <p @click = "clearAllOption" class="cursor-pointer font-semibold text-gray-900 hover:text-secondary">Xóa tất cả</p>
                    </div>
                    <h3 class="text-gray-600 text-sm mt-4">Xin chọn ngày tham gia</h3>
                    <div class="relative max-w-sm mt-2">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input v-model="selectedDate"  type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block  ps-10 p-2.5 ">
                    </div>

                    <h3 class="text-gray-600 text-sm mt-4 ">Số lượng</h3>
                    <div class="mt-2 flex justify-between items-center px-4 py-2 bg-white rounded-md">
                        <p class="font-semibold text-gray-900">Người lớn</p>
                        <div class="flex items-center">
                            <p class="text-gray-900 mr-3 font-semibold">{{ tour.priceForAdults }}<span>đ</span></p>
                            <form class="">
                                    <div class="relative flex items-center max-w-32">
                                        <button @click="decrementAdults" type="button" id="decrement-button" data-input-counter-decrement="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" id="bedrooms-input" class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full " placeholder="0" value="0" v-model="adults" required />
                                        
                                        <button @click="incrementAdults" type="button" id="increment-button" data-input-counter-increment="people-input" class="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                            </form>
                        </div>
                    </div>
                    <div class="mt-2 flex justify-between items-center px-4 py-2 bg-white rounded-md ">
                        <p class="font-semibold text-gray-900">Trẻ em(5-8)</p>
                        <div class="flex items-center">
                            <p class="text-gray-900 mr-3 font-semibold">{{ tour.priceForChildren}}<span>đ</span></p>
                            <form class="">
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
                            </form>
                        </div>
                        
                    </div>
                    <div class="mt-8 px-4 flex justify-between items-center ">
                        <div class="">
                            <p class="text-gray-900 text-sm">Tổng tiền</p>
                            <p class="text-2xl text-secondary">{{ total }}</p>
                        </div>
                    
                            <button class="px-5 py-3 text-sm font-medium text-center text-secondary bg-primary rounded-xl shadow-3xl hover:text-white hover:bg-secondary transition-colors duration-300 ease-in-out">Đặt ngay</button>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Giới thiệu -->
        <div class="introduce mt-10">
            <div class="w-3/4 mx-auto">
                <h3 class="text-3xl font-bold">Giới thiệu</h3>
                <div class="w-3/4 mt-4">
                    <p class="">
                        Bạn sẽ ngạc nhiên việc ngắm thủ đô Việt Nam nhiều đến nhường này chỉ trong một ngày - tất cả những gì bạn cần là một lịch trình thật đúng đắn. Trong tour thành phố 7 giờ này, bạn sẽ khám phá được nét đặc trưng của Hà Nội thông qua các cảnh quan thiên nhiên, bảo tàng, nơi thờ cúng và hơn thế nữa. Ngay sau khi được đón đi một cách thuận tiện từ khách sạn, bạn sẽ đến Khu Phức Hợp Hồ Chí Minh - khu vực không có xe cộ qua lại của những tượng đài, nơi tưởng niệm và vườn thực vật, cùng với những giải thích đầy ắp thông tin từ hướng dẫn viên. Tham quan Chùa Một Cột và Chùa Trấn Quốc trước khi dừng chân ở Văn Miếu Quốc Tử Giám, trường đại học quốc gia đầu tiên của Việt Nam. Sau bữa ăn trưa thư giãn, bạn vẫn còn thời gian để đi đến Hồ Hoàn Kiếm, làng gốm Bát Tràng và nhiều nơi khác. Vào cuối tour, bạn có thể chọn xem biểu diễn múa rối nước, hay đi xích lô truyền thống để tham quan hoặc tránh tình trạng giao thông có thể xảy ra khi đưa bạn trở về khách sạn.
                    </p>
                    <img src="../assets/images/carousel1.jpg" alt="Chiêm ngưỡng hồ gươm mơ mộng" class="rounded-xl mt-2">
                </div>
            </div>
        </div>
        <!-- Quy định -->
        <div class="regulations mt-10">
            <div class="w-3/4 mx-auto">
                <h3 class="text-3xl font-bold">Quy định chung và lưu ý</h3>
                <div class="w-3/4 mt-4">
                    <p class="text-gray-900 text-xl font-semibold">Quy định chung:</p>
                    <ul class="ml-4">
                        <li class=""><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary mt-2" />Xác nhận ngay tức thời. Nếu bạn không nhận được email xác nhận đơn hàng, hãy liên hệ với chúng tôi</li>
                        <li class=""><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary mt-2" />Bạn sẽ được hoàn tiền đầy đủ nếu huỷ đơn hàng trước 24 giờ kể từ thời điểm bắt đầu hoạt động</li>
                        <li class=""><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary mt-2" />Sẽ không tính phí nếu các thay đổi được thực hiện ít nhất 48 giờ trước khi hoạt động bắt đầu</li>
                    </ul>
                    <p class="text-gray-900 text-xl font-semibold">Lưu ý:</p>
                    <ul class="ml-4">
                        <li class=""><font-awesome-icon :icon="['fas', 'caret-right']" class="mr-4 text-primary mt-2" />Lăng Chủ tịch Hồ Chí Minh sẽ đóng cửa từ ngày 12/6 đến ngày 14/8 để bảo trì</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Đánh giá -->
        <div class="evaluate mt-10">
            <div class="w-3/4 mx-auto">
                <h3 class="text-3xl font-bold">Đánh giá</h3>
                <div class="w-3/4 mt-4">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">{{ getAverageRating(tour.reviews) }}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium text-gray-900 hover:text-primary dark:text-white">{{ tour.reviews.length }} reviews</a>
                    </div>

                    <div class="">
                    <form class="">
                    <div class="mb-5 flex justify-between">
                        <div class="w-1/2 mx-2">
                            <label for="" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Chất lượng</label>
                            <input type="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        </div>
                        <div class="w-1/2 mx-2">
                            <label for="" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                            <input type="text" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập họ và tên" required />
                        </div>
                    </div>
                    <div class="mb-5 flex justify-between">
                        <div class="w-1/2 mx-2">
                            <label for="" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                            <input type="text" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại" required />
                        </div>
                        <div class="w-1/2 mx-2">
                            <label for="" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ email</label>
                            <input type="email" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập email" required />
                        </div>
                    </div>
                    <div class="mx-2">
                            <label for="" class="block ml-6 text-sm font-medium text-gray-900 dark:text-white">Nhận xét của bạn</label>
                            <textarea type="text" id="" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhận xét của bạn" required ></textarea>
                    </div>
                    <div class="flex justify-end ">
                       <button type = "submit" class="md:mr-4 mt-5 px-8 py-3 text-lg font-medium text-center text-secondary bg-primary rounded-2xl shadow-3xl hover:text-white hover:bg-secondary transition-colors duration-300 ease-in-out ">Gửi</button>
                    </div>
                    </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


