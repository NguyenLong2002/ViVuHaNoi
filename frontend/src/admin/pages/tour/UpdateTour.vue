<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';


const store = useStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const tour = ref({
  title: '',
  city: '',
  vehicle: 'Chọn phương tiện',
  desc: '',
  destinations:'',
  convetratePlace:'',
  priceForAdults: '',
  priceForChildren: '',
  departureTime: 0,
  endTime:0,
  maxGroupSize: 0,
  featured: false,
  photos: []
});

const formattedPriceForAdults = ref('');
const formattedPriceForChildren = ref('');

onMounted(async () => {
  if (id) {
    try {
      await store.dispatch('tour/getSingleTour', id);
      const tourData = store.state.tour.singleTour;
      tour.value = { ...tourData };
      formattedPriceForAdults.value = new Intl.NumberFormat('de-DE').format(tourData.priceForAdults);
      formattedPriceForChildren.value = new Intl.NumberFormat('de-DE').format(tourData.priceForChildren);
    } catch (error) {
      console.error('Error fetching single tour:', error);
    }
  } else {
    console.error('ID parameter is missing');
  }
});
const checkMaxGroupSize = () => {
      if (tour.value.maxGroupSize < 0) {
        tour.value.maxGroupSize = 0;
      } else if (tour.value.maxGroupSize > 100) {
        tour.value.maxGroupSize = 100;
      }
    };

    const checkTime = (field) => {
      let value = parseFloat(tour.value[field]);
      if (isNaN(value) || value < 0) {
        tour.value[field] = 0;
      } else if (value >= 24) {
        tour.value[field] = 24;
      } else {
        tour.value[field] = value;
      }
    };
// Xử lý việc nhập và lưu giá tiền
const formatPrice = (type) => {
  let value;
  if (type === 'adults') {
    value = formattedPriceForAdults.value.replace(/\D/g, '');
    formattedPriceForAdults.value = new Intl.NumberFormat('de-DE').format(value);
    tour.value.priceForAdults = value;
  } else if (type === 'children') {
    value = formattedPriceForChildren.value.replace(/\D/g, '');
    formattedPriceForChildren.value = new Intl.NumberFormat('de-DE').format(value);
    tour.value.priceForChildren = value;
  }
};

// Hàm xử lý submit form để cập nhật tour
const updateTour = async () => {
  try {
    const formData = new FormData();

    // Append all fields from the tour form to FormData
    for (const key in tour.value) {
      if (Object.prototype.hasOwnProperty.call(tour.value, key) && key !== 'photos') {
        // Skip adding empty or invalid ObjectId fields
        if (Array.isArray(tour.value[key]) && tour.value[key].length === 0) {
          continue;
        }
        if (key === 'reviews' && (tour.value[key] === '' || tour.value[key].length === 0)) {
          continue;
        }
        formData.append(key, tour.value[key]);
      }
    }

    // Append photos to FormData
    const photoInput = document.querySelector('input[type="file"]');
    if (photoInput && photoInput.files.length > 0) {
      for (const file of photoInput.files) {
        formData.append('photos', file);
      }
    }

    await store.dispatch('tour/updateTour', { id, formData });
    alert('Cập nhật tour thành công!');
    router.push('/admin/tours');
  } catch (error) {
    console.error('Error updating tour:', error);
    alert('Cập nhật tour thất bại!');
  }
};

</script>
<template>
  <form @submit.prevent="updateTour" class="w-full mx-auto pt-32 mb-10">
    <div class="flex justify-between items-center px-40 mb-10">
      <div class="flex items-center font-semibold cursor-pointer">
        <font-awesome-icon class="text-primary ml-2" :icon="['fas', 'chevron-left']" />
        <Router-Link to="/admin/tours"><span class="ml-1 hover:text-primary">Quay lại</span></Router-Link>
      </div>
      <h1 class="text-3xl font-bold md:mr-20">CẬP NHẬT TOUR</h1>
      <div></div>
    </div>
    <div class="">
      <div class="flex w-full px-32">
        <div class="w-1/2 mx-10">
          <div class="mb-5">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề</label>
            <input v-model="tour.title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thành phố</label>
            <input v-model="tour.city" type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          
          <div class="mb-5">
            <label for="destinations" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Các điểm đến</label>
            <input v-model="tour.destinations" type="text" id="destinations" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="pickupLocation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điểm đón khách</label>
            <input v-model="tour.pickupLocation" type="text" id="pickupLocation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div>
          <div class="mb-5">
            <label for="vehicle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phương tiện</label>
            <select v-model="tour.vehicle" id="vehicle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled>Chọn phương tiện</option>
              <option value="Xe máy">Xe máy</option>
              <option value="Xe đạp">Xe đạp</option>
              <option value="Đi bộ">Đi bộ</option>
              <option value="Xe bus">Xe bus</option>
              <option value="Xích lô">Xích lô</option>
              <option value="Xe ô tô">Xe ô tô</option>
              </select>
          </div>
          <div class="mb-5">
            <label for="featured" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Đặc sắc</label>
            <input v-model="tour.featured" type="checkbox" id="featured" class="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          
        </div>
        <div class="w-1/2 mx-10">
          <div class="mb-5">
            <label for="priceForAdults" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá cho người lớn</label>
            <input v-model="formattedPriceForAdults" @input="formatPrice('adults')" type="text" id="priceForAdults" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="priceForChildren" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá cho trẻ nhỏ</label>
            <input v-model="formattedPriceForChildren" @input="formatPrice('children')" type="text" id="priceForChildren" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="tourTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời lượng trải nghiệm</label>
            <input v-model="tour.tourTime" @change="checkTime('tourTime')" type="text" id="tourTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="maxGroupSize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng người tham gia tối đa (1 - 100)</label>
            <input v-model="tour.maxGroupSize" @change="checkMaxGroupSize" type="number" id="maxGroupSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="mb-5">
            <label for="executiveOffice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Văn phòng điều hành</label>
            <input v-model="tour.executiveOffice" type="text" id="executiveOffice" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
          </div>
          <div class="mb-5">
            <label for="multiple_photos" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hình ảnh tour</label>
            <input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_photos" type="file" multiple>
          </div>
        </div>
      </div>
      <div class="mb-10 px-32 mx-10">
        <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
        <textarea v-model="tour.desc" id="desc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="8" required></textarea>
      </div>
    </div>
    <button type="submit" class="flex items-center text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-semibold rounded-2xl text-sm w-full sm:w-auto px-20 py-3 mx-auto my-4 text-center">Cập nhật tour</button>
  </form>
</template>
<style>
/* Add any required styling here */
</style>

