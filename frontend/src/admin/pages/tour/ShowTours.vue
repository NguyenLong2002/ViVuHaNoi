<script setup>
import { ref, onMounted,computed} from 'vue';
import { initDropdowns } from 'flowbite';
import { useStore } from 'vuex';

const sortOrder = ref('asc');

const store = useStore();

const tours = computed(() => {
  const sortedTours = [...store.state.tour.tours];
  if (sortOrder.value === 'asc') {
    return sortedTours.sort((a, b) => a.priceForAdults - b.priceForAdults);
  } else {
    return sortedTours.sort((a, b) => b.priceForAdults - a.priceForAdults);
  }
});

const sortTours = (event) => {
  sortOrder.value = event.target.value;
};

const toursDeleted = computed(() => store.state.tour.deletedTours);

onMounted(() => {
      store.dispatch('tour/getTours');
      store.dispatch('tour/getDeletedTours');
      initDropdowns();
    });


// const selectedFeatured = ref('FeaturedTour');


const softDeleteTour = async (tourId) =>{
    if(confirm('Bạn có muốn xóa tour này không?')){
        try{
        await store.dispatch('tour/softDeleteTour',tourId);
        alert('Xoa thanh cong!');
        await store.dispatch('tour/getTours');
        await store.dispatch('tour/getDeletedTours');
        }catch(error){
            console.log('Error soft deleting tour:',error);
            alert('Xoa that bai!');
        }
    }else{
        alert('Hủy xóa tour!');
    }
    
};

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 pt-32 h-screen">
        <div v-if="tours && tours.length > 0 ">
            <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div class="flex item-center justify-center">
                        <router-link to="/admin/tours/add" class="focus:outline-none text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-sm px-8 py-2 ">Thêm mới</router-link>

                        <router-link to="/admin/tours/trash" class="relative ml-6 text-3xl text-gray-700">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                            <span class="absolute -top-1 -right-2 px-1.5 bg-red-700 text-sm rounded-full text-white font-semibold">
                                {{ toursDeleted.length }}
                            </span>
                        </router-link>
                </div>
                
                <div class="flex">
                    <div class="mr-4">
                        <form class="max-w-sm mx-auto flex">
                            <select @change="sortTours" id="small" class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option class="py-2 " value="asc" selected>Giá: Thấp đến Cao</option>
                                <option class="py-2 " value="des">Giá: Cao đến thấp</option>
                            </select>
                        </form>
                    </div>
                    
                </div>
            </div>
            <table  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">  
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
                            Thành phố
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phương tiện
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Giá cho người lớn (vnđ)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Giá cho trẻ nhỏ (vnđ)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Người tham gia tối đa
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Thời gian trải nghiệm (h)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tour Đặc biệt
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
                        <th  class="text-start py-2">
                            {{ tour.title }}
                        </th>
                        <td class="">
                            {{ tour.city }}
                        </td>
                        <td class="">
                            {{ tour.vehicle }}
                        </td>
                        <td class="">
                            {{ tour.priceForAdults }}                    
                        </td>
                        <td class="">
                            {{ tour.priceForChildren }}
                        </td>
                        <td class="">
                            {{ tour.maxGroupSize }}                    
                        </td>
                        <td class="">
                            {{ tour.endTime - tour.departureTime }}
                        </td>
                        <td class="">
                            {{ tour.featured ? 'Có' : 'Không' }}
                        </td>
                        <td class=" ">
                            <router-link :to="'tours/'+tour._id+ '/edit'" >
                                <button class="font-semibold text-white px-2 py-1 bg-yellow-400 hover:bg-yellow-300 rounded-lg mr-1">
                                    Sửa
                                </button>
                            </router-link>
                            <button @click="softDeleteTour(tour._id)" class="font-semibold text-white px-2 py-1 bg-red-600 hover:bg-red-500  rounded-lg ">Xóa</button>
                        </td>
                    </tr>
                
                </tbody>
            </table>
            
        </div>
        <div v-else>
            <div class="text-end mr-10">
                <router-link to="/admin/tours/trash" class="ml-6 text-3xl">
                    <font-awesome-icon :icon="['fas', 'trash-can']" />
                </router-link>
                </div>
            <div class="text-center pt-32">
                
                <h1 class="text-3xl font-bold text-gray-900 mb-5">Bạn chưa có tour nào !</h1>
                <router-link to="/admin/tours/add" class="focus:outline-none text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3">Thêm mới</router-link>
            </div>
        </div>
    </div>
    
</template>