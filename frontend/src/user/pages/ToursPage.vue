<script setup>
import TourSearch from '../components/TourSearch.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('tour/getTours');
});

const tours = computed(() => store.state.tour.tours);
const getAverageRating = (reviews) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

</script>

<template>
    <div class="bg-bgPattern">
        <div class="pt-52 w-3/4 mx-auto ">
            <TourSearch />

            <div class="flex justify-between mt-32">
                <h2 class="text-4xl text-gray-900 font-extrabold">Tìm thấy ... kết quả.</h2>
                <select id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-3xl  block w-52 p-3 ">
                    <option >Không sắp xếp</option>
                    <option >Giá thấp đến cao</option>
                    <option >Giá cao đến thấp</option>
                </select>
            </div>

            <div class="flex mt-20">
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
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">Đi bộ</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">Xe đạp</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">Xe máy</label>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="disabled-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary cursor-pointer bg-gray-100 border-gray-300 rounded focus:ring-primary ">
                                <label for="disabled-checkbox" class="ms-2 text-sm font-medium text-gray-800 ">Thuyền</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-3/4">
                    <div class="">
                        <ul >
                            <li v-for="tour in tours" :key="tour._id">
                               <router-link :to="'/tours/tour-detail/' + tour._id" class="flex flex-col items-center bg-white border border-gray-200 rounded-3xl shadow md:flex-row  hover:bg-gray-100 hover:shadow-3xl p-6 mb-8">
                                    <img class="object-cover rounded-lg md:h-60 md:w-80 md:rounded-3xl" :src="tour.photo" :alt="tour.title">
                                    <div class="flex flex-col px-8 pt-8 w-full justify-between md:h-60">
                                        <div class="">
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ tour.title }}</h5>
                                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Thời lượng: <span>{{ tour.tourTime }} giờ</span></p>
                                            <p class="text-sm"><font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300"/> <span>{{ getAverageRating(tour.reviews) }}</span> (<span>{{ tour.reviews.length }}</span>) đánh giá</p>
                                            <hr class="my-6 bg-gray-500 w-full" />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <p class="text-lg font-bold text-secondary">{{ tour.priceForAdults }}<span>đ</span> / Khách</p>
                                            <button class="px-5 py-3 text-sm font-medium text-center text-secondary bg-primary rounded-3xl hover:bg-secondary hover:text-white shadow-3xl">Đặt ngay</button>
                                        </div>
                                    </div>
                                </router-link>  
                            </li>
                        </ul>
                       
                      
                    </div>

                    <!-- pagination -->
                    <div class="flex justify-center items-center mt-8">
                        <nav aria-label="Page navigation example" class="">
                        <ul class="flex items-center -space-x-px h-10 text-base">
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                                <span class="sr-only">Previous</span>
                                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                </svg>
                            </a>
                            </li>
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                            </li>
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                            </li>
                            <li>
                            <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
                            </li>
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
                            </li>
                            <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                                <span class="sr-only">Next</span>
                                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </a>
                            </li>
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>