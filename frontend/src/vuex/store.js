import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authSlice from './authSlice';
import tourSlice from './tourSlice';

const store = createStore({
  modules: {
    auth: authSlice,
    tour: tourSlice
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
});

export default store;
