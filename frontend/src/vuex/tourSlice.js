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
    },
    addTour(state, newTour) {
    state.tours.push(newTour);
    },
    updateTour(state, updatedTour) {
      const index = state.tours.findIndex(tour => tour.id === updatedTour.id);
      if (index !== -1) {
        state.tours.splice(index, 1, updatedTour);
      }
      if (state.singleTour && state.singleTour.id === updatedTour.id) {
        state.singleTour = updatedTour;
      }
    }
};

const actions = {
    // create tour
    async createTour({ commit }, newTour) {
      try {
        const formData = new FormData();
        for (const key in newTour) {
          if (key === 'photos') {
            newTour.photos.forEach(photo => formData.append('photos', photo));
          } else {
            formData.append(key, newTour[key]);
          }
        }

        const res = await axios.post('http://localhost:8000/api/tour', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        commit('addTour', res.data.data);
        return res.data.data; // return the new tour data for further usage if needed
      } catch (error) {
        console.error('Error creating tour:', error);
        throw error; // rethrow error for handling in component
      }
    },
    //update tour
    async updateTour({ commit }, updatedTour) {
      try {
        const res = await axios.put(`http://localhost:8000/api/tour/${updatedTour.id}`, updatedTour);
        commit('updateTour', res.data.data);
        return res.data.data;
      } catch (error) {
        console.error('Error updating tour:', error);
        throw error;
      }
    },
    // get tours
    async getTours({ commit }) {
        try {
          const res = await axios.get('http://localhost:8000/api/tour'); 
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
