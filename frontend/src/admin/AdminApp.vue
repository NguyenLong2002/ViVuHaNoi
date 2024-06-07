<template>
  <div v-if="isAdmin">
    <router-view />
  </div>
  <div v-else>
    <p>You do not have access to this page</p>
  </div>
</template>

<script>
import { checkAdmin } from '../utils/utility';

export default {
  name: 'AdminApp',
  data() {
    return {
      isAdmin: false
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
