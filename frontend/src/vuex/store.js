import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authSlice from './authSlice';

const store = createStore({
  modules: {
    auth: authSlice
  },
  plugins: [createPersistedState({
    paths: ['auth'] // Persist only the login.currentUser state
  })]
});

export default store;
