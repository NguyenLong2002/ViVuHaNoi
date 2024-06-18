  
<script setup>
  import TourSearch from '../components/TourSearch.vue';
  import TourListCard from '../components/TourListCard.vue'
</script>

<template>
  <div class="mt-16 relative">
    <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-[450px]">
         <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../../assets/images/carousel1.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../../assets/images/carousel2.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../../assets/images/carousel3.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 4 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../../assets/images/carousel4.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        
    </div>
    
    <!-- Slider controls -->
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
    </div>
  </div>

  <!-- Tours search -->
  <div class="w-2/3 mx-auto absolute right-1/2 top-1/2 translate-x-1/2 z-30">
    <TourSearch />
  </div>

  <div class="introduce w-3/4 mx-auto mt-52 flex justify-between text-textColor ">
    <div class="w-[35%] text-center">
      <h1 class="text-3xl font-extrabold ">Nét đẹp về quá khứ, hiện tại và tương lai.</h1>
      <span class="w-28 h-[2px] block bg-primary mt-8 mx-auto"></span>
    </div>
    <div class="w-1/2">
      <p class="text-lg font-medium opacity-90 ">
        Thủ đô Hà Nội là một nơi đầy những di tích lịch sử và văn hóa, trung tâm của sự phát triển và tiến bộ hiện đại. Bằng cách kết hợp giữa bản sắc văn hóa truyền thống và sự đổi mới tiên tiến, Hà Nội mang lại cho người dân và du khách một trải nghiệm độc đáo, phong phú và không ngừng lôi cuốn.
      </p>
    </div>
  </div>

  
  <!-- Các tour du lịch -->
  <div class="tours mt-24 w-3/4 mx-auto mb-30">
    <div class="text-center">
      <h1 class="font-extrabold text-3xl text-gray-900">Các tour Hà Nội hấp dẫn nhất</h1>
      <p class="text-lg font-semibold text-gray-800 mt-2">Hấp Dẫn - Thú Vị - Độc Đáo</p>
      <span class="w-28 h-[2px] block bg-primary mt-4 mx-auto"></span>
    </div>
    <div class="mt-20">
      <TourListCard />
    </div>

    <div class="w-full flex justify-center">
      <router-link to="/tours">
        <button type="button" class="flex justify-center mt-12 px-5 py-3 border border-gray-200 rounded-3xl shadow-lg text-gray-900 items-center hover:bg-gray-200 hover:shadow-3xl">
          <span class="mr-1">Xem tất cả địa điểm </span>
          <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-sm text-gray-700" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
