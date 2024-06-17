<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const users = computed(() => store.state.user.users); 

onMounted(() => {
  store.dispatch('user/getUsers');
});

</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-8 pt-32 h-screen">
    <div v-if="users && users.length > 0">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Tên</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Thời gian tạo</th>
            <th scope="col" class="px-6 py-3">Hành động</th>
          </tr>
        </thead>
        <tbody class="mt-40">
          <tr v-for="user in users" :key="user._id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th>{{ user.username }}</th>
            <td>{{ user.role }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.createdAt }}</td>
            <td>
              <router-link :to="'users/'+user._id+ '/edit'">
                <button class="font-semibold text-white px-2 py-1 bg-yellow-400 hover:bg-yellow-300 rounded-lg mr-1">
                  Sửa
                </button>
              </router-link>
              <button class="font-semibold text-white px-2 py-1 bg-red-600 hover:bg-red-500 rounded-lg">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>không có user nào</p>
    </div>
  </div>
</template>
