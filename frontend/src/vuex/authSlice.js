import axios from 'axios';
axios.defaults.withCredentials = true;
const state = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
};

const mutations = {
  loginStart(state) {
    state.login.isFetching = true;
    state.login.error = false;
  },
  loginSuccess(state, user) {
    state.login.isFetching = false;
    state.login.currentUser = user;
    state.login.error = false;
  },
  loginFailed(state) {
    state.login.isFetching = false;
    state.login.error = true;
  },
  registerStart(state) {
    state.register.isFetching = true;
    state.register.error = false;
    state.register.success = false;
  },
  registerSuccess(state) {
    state.register.isFetching = false;
    state.register.success = true;
    state.register.error = false;
  },
  registerFailed(state) {
    state.register.isFetching = false;
    state.register.error = true;
  },

  logoutStart(state) {
    state.login.isFetching = true;
  },
  logoutSuccess(state) {
    state.login.isFetching = false;
    state.login.currentUser = null;
    state.login.error = false;
  },
  logoutFailed(state) {
    state.login.isFetching = false;
    state.login.error = true;
  },
};

const actions = {
  async login({ commit }, user) {
    commit('loginStart');
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', user);
      if (response.data.success) {
        const userData = response.data.user;
        commit('loginSuccess', userData);
        return { success: true, user: userData };
      } else {
        commit('loginFailed');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      commit('loginFailed');
      if (error.response && error.response.data) {
        return { success: false, message: error.response.data.message };
      } else {
        return { success: false, message: 'Unknown error' };
      }
    }
  },

  async register({ commit }, newUser) {
    commit('registerStart');
    try {
      await axios.post('http://localhost:8000/api/auth/register', newUser);
      commit('registerSuccess');
      return true;
    } catch (error) {
      commit('registerFailed');
      throw error;
    }
  },

  async logout({ commit },) {
    commit('logoutStart');
    try {
      await axios.post('http://localhost:8000/api/auth/logout');
      commit('logoutSuccess');
    } catch (error) {
      commit('logoutFailed');
    }
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
