import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authSlice from './authSlice';
import tourSlice from './tourSlice';
import userSlice from './userSlice';
import reviewSlice from './reviewSlice';

const store = createStore({
  modules: {
    auth: authSlice,
    tour: tourSlice,
    user: userSlice,
    review: reviewSlice
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
});

export default store;
