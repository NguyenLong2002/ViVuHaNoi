<script setup>
import { onMounted,computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
onMounted(() => {
    store.dispatch('tour/getDeletedTours');
});

const tours = computed(() => store.state.tour.deletedTours);

//Restore Tour Deleted
const restoreTour = async (tourId) =>{
    if(confirm('Bại có muốn khôi phục tour này không?')){
       try{
        await store.dispatch('tour/restoreTour',tourId);
        alert('Khôi phục thành công!');
        await store.dispatch('tour/getDeletedTours')
        }catch(error){
            console.log('Error restoring tour:',error);
            alert('Khôi phục thất bại!');
        } 
    }else{
        alert('Hủy khôi phục!');
    }
};

//Hard Tour Deleted
const hardDeletedTour = async (tourId) =>{
    if(confirm('Bạn có muốn xóa vĩnh viễn tour này không?')){
        try{
            await store.dispatch('tour/hardDeleteTour', tourId);
            alert('Xóa tour thành công!');
            await store.dispatch('tour/getDeletedTours');
        }catch(err){
            console.log('Error hard deleting tour:', err);
            alert('Xóa tour thất bại');
        }
    }else{
        alert('Hủy xóa vĩnh viễn tour!');
    }
}

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 h-screen pt-32">
        <div v-if="tours && tours.length > 0 ">
            <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div class="flex items-center font-semibold cursor-pointer">
                    <font-awesome-icon class="text-primary ml-2" :icon="['fas', 'chevron-left']" />
                    <Router-Link to="/admin/tours"><span class="ml-1 hover:text-primary">Quay lại</span></Router-Link>
                </div>
                
                <div class="relative">
                        <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">  
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tên tour
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tour đặc biệt
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Giá cho người lớn (vnđ)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody class="mt-40">
                    <tr  v-for="tour in tours" :key="tour._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th  class="text-start">
                            {{ tour.title }}
                        </th>
                        <td  class="text-start">
                            {{ tour.featured ? 'Có':'Không' }}
                        </td>
                        <td class="">
                            {{ tour.priceForAdults }}                    
                        </td>
                        <td class=" flex flex-col items-center py-2">
                            <button @click="restoreTour(tour._id)" class="font-semibold text-white p-2 bg-yellow-400 hover:bg-yellow-300 rounded-lg">Khôi phục</button>
                            <button @click="hardDeletedTour(tour._id)" class="font-semibold text-white p-2 bg-red-600 hover:bg-red-500  rounded-lg mt-2">Xóa vĩnh viễn</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div class="text-center pt-32">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">Thùng rác trống!</h1>
                <router-link to="/admin/tours" class="focus:outline-none text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">Quay lại</router-link>
            </div>
        </div>
    </div>
    
</template>