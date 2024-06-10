<template>
    <form @submit.prevent="createTour" class="w-full mx-auto pt-32">
        <h1 class="mb-12 text-3xl font-bold text-center">THÊM TOUR MỚI</h1>
        <div class="flex w-full px-32">
            <div class="w-1/2 mx-10">
                <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
                    <input v-model="tour.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                    <input v-model="tour.address" type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thành phố</label>
                    <input v-model="tour.city" type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="vehicle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phương tiện</label>
                    <select v-model="tour.vehicle" id="vehicle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Phương tiện</option>
                        <option value="motorbike">Xe máy</option>
                        <option value="bicycle">Xe đạp</option>
                        <option value="walk">Đi bộ</option>
                        <option value="bus">Xe bus</option>
                    </select>
                </div>
                <div class="mb-5">
                    <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
                    <textarea v-model="tour.desc" id="desc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="5" required></textarea>
                </div>
            </div>
            <div class="w-1/2 mx-10">
                <div class="mb-5">
                    <label for="priceForAdults" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá cho người lớn</label>
                    <input v-model="tour.priceForAdults" type="number" id="priceForAdults" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="priceForChildren" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá cho trẻ nhỏ</label>
                    <input v-model="tour.priceForChildren" type="number" id="priceForChildren" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="maxGroupSize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng người tham gia tối đa</label>
                    <input v-model="tour.maxGroupSize" type="number" id="maxGroupSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="tourTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gia trải nghiệm</label>
                    <input v-model="tour.tourTime" type="text" id="tourTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="featured" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đặc sắc</label>
                    <input v-model="tour.featured" type="checkbox" id="featured" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="mb-5">
                    <label for="multiple_photos" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh tour</label>
                    <input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_photos" type="file" multiple>
                </div>
            </div>
        </div>
        <button type="submit" class="flex items-center text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-semibold rounded-2xl text-sm w-full sm:w-auto px-20 py-3 mx-auto my-4 text-center">Thêm tour</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tour: {
                title: '',
                address: '',
                city: '',
                vehicle: '',
                desc: '',
                priceForAdults: 0,
                priceForChildren: 0,
                maxGroupSize: 0,
                tourTime: '',
                featured: false,
                photos: []
            }
        };
    },
    methods: {
        async createTour() {
            const formData = new FormData();
            for (const key in this.tour) {
                if (key === 'photos') {
                    this.tour.photos.forEach(photo => formData.append('photos', photo));
                } else {
                    formData.append(key, this.tour[key]);
                }
            }

            try {
                const response = await axios.post('http://localhost:8000/api/tour', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data.success) {
                    alert('Tour created successfully');
                    this.$router.push('/admin/tours');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    alert('Error: ' + error.response.data.message);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                    alert('No response from server. Please try again.');
                } else {
                    console.error('Error', error.message);
                    alert('Failed to create tour. Please try again.');
                }
            }
        },
        handleFileUpload(event) {
            this.tour.photos = Array.from(event.target.files);
        }
    }
};
</script>

<style>
/* Add any required styling here */
</style>
