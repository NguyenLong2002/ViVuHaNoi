<template>
  <div v-if="isAdmin">
    <HeaderAdmin />
    <SidebarAdmin />
    <div class="sm:ml-64">
      <RouterView />
    </div>
  </div>
  <div v-else>
    <p>Access Denied</p>
  </div>
</template>


<script>
import { checkAdmin } from '../utils/utility';
import HeaderAdmin from './components/HeaderAdmin.vue';
import SidebarAdmin from './components/SidebarAdmin.vue'
export default {
  name: 'AdminApp',
  components:{
    HeaderAdmin,
    SidebarAdmin
  },
  data() {
    return {
      isAdmin: false,
      
    };
  },
  async created() {
    this.isAdmin = await checkAdmin();
  }
}
</script>


<style scoped>
/* Add admin-specific styles here */
</style>
