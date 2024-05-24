

<script>
import NavbarApp from './components/layouts/NavbarApp.vue';
import FooterApp from './components/layouts/FooterApp.vue'
import 'flowbite';

import { onMounted } from 'vue'
import {  
    initFlowbite ,
    initCarousels,
    initDropdowns, 
    } from 'flowbite'
    onMounted(() => {
      initFlowbite();
      initDropdowns();
      initCarousels();
    });
export default {
  setup() {
    
    
  },
  components: {
    NavbarApp,
    FooterApp
  }
}
</script>

<template>
  <NavbarApp />
  <router-view/>
  <FooterApp />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap');
#app {
  font-family: 'Archivo', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>
