<template>
    <div>
      <HeaderApp />
      <router-view/>
      <FooterApp />
    </div>
  </template>
  
  <script>
  import HeaderApp from './components/HeaderApp.vue';
  import FooterApp from './components/FooterApp.vue'
  export default {
    name: 'UserApp',
     components: {
      HeaderApp,
      FooterApp
    }
  }
  </script>

  <style scoped>
  /* Add user-specific styles here */
  </style>
  