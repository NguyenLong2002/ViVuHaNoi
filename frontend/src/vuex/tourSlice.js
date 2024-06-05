// store/tourSlice.js
import axios from 'axios';

const state = {
  tours: [],
  singleTour: null,
};

const mutations = {
    setTours(state, tours) {
        state.tours = tours; 
    },
    setSingleTour(state, tour) {
    state.singleTour = tour; 
  }
};

const actions = {
    // get tours
    async getTours({ commit }) {
        try {
          const res = await axios.get('http://localhost:8000/api/tour'); 
          console.log(res.data.data);
          commit('setTours', res.data.data);
        } catch (error) {
          console.error('Error fetching tours:', error);
        }
      },


    //get single tour
      async getSingleTour({ commit }, id) {
        try {
          const res = await axios.get(`http://localhost:8000/api/tour/${id}`);
          commit('setSingleTour', res.data.data);
        } catch (error) {
          console.error('Error fetching single tour:', error);
        }
      }

};

const getters = {
  getTours: state => state.tours,
  getSingleTour: state => state.singleTour
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
