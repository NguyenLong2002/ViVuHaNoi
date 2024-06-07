import { createApp } from 'vue';
import App from './App.vue';
import './styles.css'; //style tailwind
import 'flowbite';
import 'flowbite/dist/flowbite.min.css'; // Import Flowbite CSS
import store from '../src/vuex/store';

import { createRouter, createWebHistory  } from 'vue-router'; // Sử dụng createRouter và createWebHistory thay vì VueRouter
import {routes} from './routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faArrowRight,
  faStar,
  faCircleCheck,
  faCircleXmark,
  faCaretRight,
  faAngleLeft,
 } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight,faStar,faCircleCheck,faCircleXmark,faCaretRight,faAngleLeft);

const router = createRouter({
    history: createWebHistory(), // Sử dụng createWebHistory thay vì VueRouter
    routes
});

const app = createApp(App);
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.use(router);
  app.use(store);
  app.mount('#app');