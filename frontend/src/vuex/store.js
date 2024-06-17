import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authSlice from './authSlice';
import tourSlice from './tourSlice';
import userSlice from './userSlice';

const store = createStore({
  modules: {
    auth: authSlice,
    tour: tourSlice,
    user: userSlice
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
});

export default store;
