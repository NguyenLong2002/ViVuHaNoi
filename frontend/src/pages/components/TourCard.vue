<template>
  <router-link :to="'/tours/tour-detail/' + tour._id">
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-3xl hover:shadow-full transition-shadow overflow-hidden">
      <a href="#">
        <img :src="tour.photo" :alt="tour.title" />
      </a>
      <div class="p-5 flex flex-col min-h-48">
        <a href="#" class="grow">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{{ tour.title }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Thời lượng: <span>{{ tour.tourTime }}</span> giờ</p>
        <div class="flex justify-between items-center">
          <p class="text-lg font-bold text-secondary">{{ tour.priceForAdults }}<span>đ</span> / Khách</p>
          <a href="#" class="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-secondary bg-primary rounded-3xl hover:bg-secondary hover:text-white shadow-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Đặt ngay
          </a>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    tour: {
      type: Object,
      required: true,
    },
  },
};
</script>
