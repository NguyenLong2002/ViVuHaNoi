<script>
const backendBaseUrl = 'http://localhost:8000';

export default {
  props: {
    tour: {
      type: Object,
      required: true,
    },
  
  },
  methods: {
    getTourPhotoUrl(photos) {
      if (Array.isArray(photos) && photos.length > 0) {
        
        return `${backendBaseUrl}${photos[0]}`;
    } else {
        return 'default.jpg';
      }
    },
    getAverageRating(reviews){
      if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / reviews.length).toFixed(1);
    },
    formatPrice(value) {
      return new Intl.NumberFormat('vi-VN').format(value);
    }
  }
};
</script>

<template>
  <router-link :to="'/tours/tour-detail/' + tour._id">
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-3xl hover:shadow-full transition-shadow overflow-hidden">
      <a href="#">
        <div class="w-full h-56 overflow-hidden">
          <img class="w-full h-full object-cover" :src="getTourPhotoUrl(tour.photos)" :alt="tour.title" />
        </div>
      </a>
      <div class="p-5 flex flex-col min-h-52">
        <a href="#" class="grow">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{{ tour.title }}</h5>
        </a>
        <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">Thời lượng: <span>{{ tour.endTime - tour.departureTime }}</span> giờ</p>
        <p class="text-sm"><font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300"/> <span>{{ getAverageRating(tour.reviews) }}</span> (<span>{{ tour.reviews.length }}</span>) đánh giá</p>
        <div class="flex justify-between items-center">
          <p class="text-lg font-bold text-secondary">{{ formatPrice(tour.priceForAdults) }}đ / Khách</p>
          <a href="#" class="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-secondary bg-primary rounded-3xl hover:bg-secondary hover:text-white shadow-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Đặt ngay
          </a>
        </div>
      </div>
    </div>
  </router-link>
</template>




