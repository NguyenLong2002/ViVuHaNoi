<template>
  <router-view/>
</template>

<script>
import 'flowbite';

import { onMounted } from 'vue';
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
      }
    }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap');
#app {
  font-family: 'Archivo', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>