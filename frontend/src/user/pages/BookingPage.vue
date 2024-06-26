<script setup>
import { onMounted, computed,  } from 'vue';
import { useStore } from 'vuex';
import {useRoute} from 'vue-router';

const backendBaseUrl = 'http://localhost:8000';
const store = useStore();
const route = useRoute();
const id = route.params.id;

const bookingInfo = computed(() => store.state.booking.bookingInfo);

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

    const savedBookingInfo = localStorage.getItem('bookingInfo');
  if (savedBookingInfo) {
    store.commit('booking/setBookingInfo', JSON.parse(savedBookingInfo));
  }
});



const tour = computed(() => store.state.tour.singleTour);
//Lấy hình ảnh
const getTourPhotoUrl = (photos) => {
    if (photos) {
        return `${backendBaseUrl}${photos.split('\\').join('/')}`;
    } else {
        return `${backendBaseUrl}/images/tour/default.jpg`;
    }
};
//Định dạng ngày
const formattedDate = (inputDate) =>{
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


</script>

<template>
    <div class="pt-32 bg-bgPattern">
        <div class="mx-auto w-3/4">
            <div class="w-full bg-gray-100 px-6 py-8 rounded-3xl">
                <div class="w-[90%] mx-auto relative">
                    <div class="absolute h-1 w-full top-6 bg-gray-400"></div>
                </div>
                <ol class="flex items-center justify-between w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base relative">
                    <li class="flex flex-col items-center relative">
                        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 relative z-10">
                            <svg class="w-3.5 h-3.5 text-secondary lg:w-4 lg:h-4 dark:text-blue-300 font-semibold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                        </span>
                        <p class="mt-2 font-semibold text-secondary ">Chọn đơn hàng</p>
                    </li>
                    <li class="flex flex-col items-center relative">
                        
                        <span class="flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 relative z-10">
                            <svg class="w-4 h-4 text-yellow-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                            </svg>
                        </span>
                        <p class="mt-2 font-semibold text-gray-800">Điền thông tin</p>
                    </li>
                    <li class="flex flex-col items-center">
                        <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 relative z-10">
                            <svg class="w-4 h-4 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                            </svg>
                        </span>
                        <p class="mt-2 font-semibold">Thanh toán</p>
                    </li>
                </ol>
            </div>
        </div>
        <div class="mt-20 w-3/4 mx-auto">
            <div class="flex">
                <div class="w-4/6 p-8 rounded-3xl bg-gray-100">
                    <div class="flex flex-col justify-center">
                        <h2 class="ml-4 text-2xl font-semibold text-primary">Điền thông tin</h2>
                        <span class="w-full h-0.5 bg-gray-300 mt-4"></span>
                    </div>
                    <h2 class="mt-6 text-xl font-medium text-gray-900  border-primary pl-4 border-l-4">Thông tin đơn hàng</h2>
                    <div v-if="tour && tour.photos && tour.photos.length && tour.title" class="flex p-4 border-gray-300 rounded-xl border-2 mt-6 bg-white">
                        <div class="h-28 w-36 rounded-xl overflow-hidden">
                            <img :src="getTourPhotoUrl(tour.photos[0])" :alt="tour.title" class="w-full h-full object-cover" >
                        </div>
                        <div class="ml-2 px-4">
                            <p class="text-2xl font-semibold text-gray-900">{{ tour.title }}</p>
                            <p class="">...</p>
                        </div>
                    </div>
                    <div class="mt-8 text-xl font-medium text-gray-900  border-primary pl-4 border-l-4">Thông tin liên lạc</div>
                    <div class="mt-6">
                        <form class="w-full p-4 border-gray-300 rounded-xl border-2 bg-white">
                            <div class="flex">
                                <div class="w-1/2 mr-4">
                                    <div class="mb-5">
                                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ</label>
                                        <input type="text" id="firstName" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: Nguyen" required />
                                    </div>
                                    <div class="mb-5">
                                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                        <input type="number" id="phone" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div class="mb-5">
                                        <label for="hotelAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên & địa chỉ khách sạn</label>
                                        <input type="text" id="hotelAddress" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                </div>
                                <div class="w-1/2 ml-4">
                                    <div class="mb-5">
                                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                                        <input type="text" id="lastName" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vd: Nam" required />
                                    </div>
                                    <div class="mb-5">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email" id="email" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                                    </div>
                                    <div class="mb-5">
                                        <label for="timeStart" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn thời gian bắt đầu (sớm nhất lúc 08:00, muộn nhất là 18:00)</label>
                                        <input type="text" id="timeStart" class="border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                </div>
                            </div>

                            <div class="mb-5">
                                <label for="userRequest" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Yêu cầu của bạn</label>
                                <textarea type="text" id="userRequest" rows="4" class=" border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>
                            </div>
                            <div class="mt-16">
                                <p class="px-4 py-2 rounded-xl text-secondary border-2 border-green-200 bg-green-50">Hoàn hủy miễn phí trong 24h</p>
                                <p class="px-4 py-2 rounded-xl text-gray-800 border-2 border-yellow-200 bg-yellow-50 mt-4">Vui lòng điền thông tin chính xác. Một khi đã gửi thông tin, bạn sẽ không thay đổi được.</p>
                                </div>
                            <div class="flex mt-8 px-2 items-center justify-center">
                                <div class="w-2/3 text-sm">Đơn hàng của bạn sẽ được gửi đi sau khi bạn đến bước tiếp theo (Bạn có thể chọn phương thức thanh toán ở trang kế tiếp)</div>
                                <div class="w-1/3 flex justify-end items-center">
                                    <button type="submit" class="px-4 py-2 text-lg font-medium text-center text-secondary bg-primary rounded-xl shadow-3xl hover:text-white hover:bg-secondary transition-colors duration-300 ease-in-out cursor-pointer">Thanh toán</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                <div id="billInfo"   class="w-2/6 ml-4 p-8 bg-gray-100 rounded-3xl ">
                   <div v-if="tour && tour.title" class="p-4 rounded-xl bg-white">
                        <p class="text-xl font-semibold text-gray-900">{{ tour.title }}</p>
                        <p class="mt-2 text-sm text-secondary">Hoàn hủy miễn phí trong 24h</p>
                        <span class="block h-0.5 w-full bg-gray-100 my-4"></span>
                        <div  class="flex items-center justify-between ">
                            <p class="text-gray-600">Ngày </p>
                            <p class="text-gray-800">{{ formattedDate(bookingInfo.selectedDate)  }}</p>
                        </div>

                        <div class="flex justify-between mt-2">
                            <p class="text-gray-600">Đơn vị </p>
                            <div class="">
                                <p v-if="bookingInfo.numAdults > 0" class="text-gray-800">Người lớn x {{ bookingInfo.numAdults  }} </p>
                                <p v-if="bookingInfo.numChildren > 0" class="text-gray-800">Trẻ nhỏ x {{ bookingInfo.numChildren  }} </p>
                            </div>
                        </div>
                        <span class="block h-0.5 w-full bg-gray-100 my-4"></span>
                        <div class="flex items-center justify-between">
                            <p class="text-gray-600">Tổng cộng</p>
                            <p class="font-semibold text-gray-900">{{ bookingInfo.totalAmount  }}</p>
                        </div>
                   </div>
                   <div class="p-4 rounded-xl bg-white mt-4">
                    <div class="flex items-center justify-between">
                            <p class="text-gray-600">Tổng cộng</p>
                            <p class="font-semibold text-gray-800 text-sm">{{ bookingInfo.totalAmount  }}</p>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <p class="text-gray-600">Số tiền thanh toán</p>
                            <p class="text-xl font-semibold text-primary">{{ bookingInfo.totalAmount  }}</p>
                        </div>
                   </div>
                   
                </div>
            </div>
        </div>
    </div>
</template>
