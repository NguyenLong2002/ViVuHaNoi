// src/store.js
import { createStore } from 'vuex';
import authSlice from './authSlice';

const store = createStore({
  modules: {
    auth: authSlice
  }
});

export default store;

