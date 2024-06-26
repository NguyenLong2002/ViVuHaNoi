<script setup>
import TourSearch from '../components/TourSearch.vue';
import { onMounted, computed,ref, watch } from 'vue';
import { useStore } from 'vuex';
import PaginateApp from '../components/PaginateApp.vue'

const backendBaseUrl = 'http://localhost:8000';
const store = useStore();

const currentPage = ref(1);
const toursPerPage = 5;

const vehicles = ['Đi bộ','Xe đạp','Xe ô tô', 'Xe xích lô','Xe máy','Xe bus'];

onMounted(() => {
  store.dispatch('tour/getTours');
});

const tours = computed(() => store.state.tour.tours);


const paginatedTours = computed(() => {
    const start = (currentPage.value - 1) * toursPerPage;
    const end = start + toursPerPage;
    return tours.value.slice(start,end)
});
// Watch currentPage and scroll to the top of the tour list when it changes
watch(currentPage, () => {
  const tourListElement = document.getElementById('tourList');
  if (tourListElement) {
    window.scrollTo({
      top: tourListElement.getBoundingClientRect().top + window.scrollY - 250,
      behavior: 'smooth'
    });
  }
});

const getAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

const getTourPhotoUrl = (photos) => {
    if (Array.isArray(photos) && photos.length > 0) {
        
        return `${backendBaseUrl}${photos[0]}`;
    } else {
        return 'default.jpg';
    }
};

const formatPrice = (value) => {
      return new Intl.NumberFormat('vi-VN').format(value);
};

</script>

<template>
    <div class="bg-bgPattern">
        <div class="pt-52 w-3/4 mx-auto ">
            <TourSearch />

            <div class="flex justify-between mt-32">
                <div class="">
                    <h2 class="text-4xl text-gray-900 font-extrabold">Tìm thấy {{ tours.length }} kết quả.</h2>
                    <p class="h-[2px] w-24 bg-primary mt-4"></p>
                </div>
                <select id="" class=" border-gray-300 text-gray-900 text-lg rounded-full  block  px-5 ">
                    <option >Không sắp xếp</option>
                    <option >Giá : Thấp đến Cao</option>
                    <option >Giá : Cao đến Thấp</option>
                </select>
            </div>

            <div  class="flex mt-20">
                <div class="w-1/4 px-6 border border-gray-200 rounded-3xl mr-8">
                    <div class="flex justify-between items-center py-6 border-b border-gray-300">
                        <h2 class="font-bold text-xl text-gray-700">Lọc kết quả</h2>
                        <p class="text-sm text-secondary font-semibold cursor-pointer hover:text-primary">Đặt lại</p>
                    </div>
                    <div class="mt-4">
                        <h2 class="font-semibold text-gray-800" >Xếp hạng sao</h2>
                        <div class="mt-3">
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">3 sao</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">4 sao</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">5 sao</label>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <h2 class="font-semibold text-gray-800">Phương tiện</h2>
                        <div class="mt-3">
                            <div v-for="(vehicle, index) in vehicles" :key="index" class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">{{ vehicle }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/4">
                    <div id="tourList" >
                        <ul>
                            <li v-for="tour in paginatedTours" :key="tour._id">
                               <router-link :to="'/tours/tour-detail/' + tour._id" class="relative flex flex-col items-center bg-white border border-gray-200 rounded-3xl shadow md:flex-row  hover:bg-gray-100 hover:shadow-3xl p-6 mb-8">
                                    <div v-if="tour.featured" class="absolute top-8 left-8 px-4 py-2 text-white text-sm font-semibold bg-orange-500 rounded-2xl">Đặc sắc</div>
                                    <img class="object-cover rounded-lg md:h-60 md:w-80 md:rounded-3xl" :src="getTourPhotoUrl(tour.photos)" :alt="tour.title">
                                    <div class="flex flex-col px-8  w-full justify-between ">
                                        <div class="">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ tour.title }}</h5>
                                            <div class="flex justify-between mt-1">
                                                <p class="font-normal text-gray-900 dark:text-gray-400">Thời lượng: {{ tour.tourTime  }} giờ</p>
                                                <p class="font-normal text-gray-900 dark:text-gray-400">Phương tiện: {{ tour.vehicle }}</p>
                                            </div>
                                            <p class="text-sm mt-4"><font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300"/> <span>{{ getAverageRating(tour.reviews) }}</span> (<span>{{ tour.reviews.length }}</span>) đánh giá</p>
                                            <hr class="my-6 bg-gray-500 w-full" />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <p class="text-lg font-bold text-secondary">{{ formatPrice(tour.priceForAdults) }}đ / Khách</p>
                                            <button class="px-5 py-3 text-sm font-medium text-center text-secondary bg-primary rounded-3xl hover:bg-secondary hover:text-white shadow-3xl">Đặt ngay</button>
                                        </div>
                                    </div>
                                </router-link>  
                            </li>
                        </ul>
                       
                      
                    </div>

                    <!-- pagination -->
                    <div class="flex justify-center items-center mt-12">
                        <PaginateApp
                            :totalItems="tours.length"
                            :itemsPerPage="toursPerPage"
                            v-model:modelValue="currentPage"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>