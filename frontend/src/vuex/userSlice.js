// store/userSlice.js
import axios from 'axios';

const state = {
  users: [],
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  // Get users
  async getUsers({ commit }) {
    try {
      const res = await axios.get('http://localhost:8000/api/user');
      commit('setUsers', res.data); // Chắc chắn rằng `res.data` là mảng người dùng
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
};

const getters = {
  getUsers: state => state.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
