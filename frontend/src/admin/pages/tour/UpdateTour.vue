<script>
import { onMounted,computed } from 'vue';
import { initDropdowns } from 'flowbite';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('tour/getTours');
      initDropdowns();
    });

    const tours = computed(() => store.state.tour.tours);

    return {
      tours,
    };
  },
};
</script>
<template>
    <form class="w-full mx-auto">
        <h1 class="mb-12 text-3xl font-bold text-center">Cập nhật tour mới</h1>
        <div class="flex w-full px-32">
            <div class="w-1/2 mx-10">
                <div class="mb-5">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="vehicle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">vehicle</label>
                    <input type="text" id="vehicle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrition</label>
                    <textarea type="text" id="desc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="5" required >
                    </textarea>
                </div>
            </div>   
            <div class="w-1/2 mx-10">
                <div class="mb-5">
                    <label for="priceForAdults" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">priceForAdults</label>
                    <input type="text" id="priceForAdults" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                <label for="priceForChildren" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">priceForChildren</label>
                <input type="text" id="priceForChildren" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="maxGroupSize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">maxGroupSize</label>
                    <input type="text" id="maxGroupSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="tourTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tourTime</label>
                    <input type="text" id="tourTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    <label for="featured" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">featured</label>
                    <input type="text" id="featured" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div class="mb-5">
                    
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_photos">photo</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_photos" type="file" multiple>

                </div>
            </div>
        </div>
        <button type="submit" class="flex items-center text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-semibold rounded-2xl text-sm w-full sm:w-auto px-20 py-3 mx-auto my-4 text-center">Cập nhật</button>
    </form>
</template>
