// store/tourSlice.js
import axios from 'axios';

const state = {
  tours: [],
  singleTour: null,
  toursFeatured :[],
  deletedTours: [],
  toursByVehicle:[],
};

const mutations = {
    setTours(state, tours) {
      state.tours = tours; 
    },
    setSingleTour(state, tour) {
      state.singleTour = tour; 
    },
    setToursFeatured(state, tour) {
      state.toursFeatured = tour; 
    },
    setDeletedTours(state, tours) {
      state.deletedTours = tours;
    },
    setToursByVehicle(state, tours){
      state.toursByVehicle = tours
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
    },
    removeTour(state, tourId) {
      state.tours = state.tours.filter(tour => tour.id !== tourId);
    },
    removeDeletedTour(state, tourId) {
      state.deletedTours = state.deletedTours.filter(tour => tour.id !== tourId);
    },
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
        return res.data.data; 
      } catch (error) {
        console.error('Error creating tour:', error);
        throw error; // rethrow error for handling in component
      }
    },
    //update tour
    async updateTour({ commit }, { id, formData }) {
      try {
        const res = await axios.put(`http://localhost:8000/api/tour/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        commit('updateTour', res.data.data);
        return res.data.data;
      } catch (error) {
        console.error('Error updating tour:', error);
        if (error.response) {
          console.error('Server error details:', error.response.data);
          console.error('Server error status:', error.response.status);
        }
        throw error;
      }
    },
    // Soft delete tour
    async softDeleteTour({ commit }, tourId) {
      try {
        await axios.put(`http://localhost:8000/api/tour/soft-delete/${tourId}`);
        commit('removeTour', tourId); // Remove tour from the list
      } catch (error) {
        console.error('Error soft deleting tour:', error);
        throw error;
      }
    },
     // Hard delete tour
    async hardDeleteTour({ commit }, tourId) {
      try {
        await axios.delete(`http://localhost:8000/api/tour/${tourId}`);
        commit('removeDeletedTour', tourId); // Remove tour from the deleted list
      } catch (error) {
        console.error('Error hard deleting tour:', error);
        throw error;
      }
    },
    // Get deleted tours
    async getDeletedTours({ commit }) {
      try {
        const res = await axios.get('http://localhost:8000/api/tour/trash');
        commit('setDeletedTours', res.data.data);
      } catch (error) {
        console.error('Error fetching deleted tours:', error);
      }
    },
    // Restore tour
    async restoreTour({ commit }, tourId) {
      try {
        const res = await axios.put(`http://localhost:8000/api/tour/restore/${tourId}`);
        commit('restoreTour', res.data.data); // Restore tour to the list
      } catch (error) {
        console.error('Error restoring tour:', error);
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
      },
    //get tours featured
      async getToursFeatured({ commit }) {
        try {
          const res = await axios.get(`http://localhost:8000/api/tour/search/featuredTours`);
          commit('setToursFeatured', res.data.data);
        } catch (error) {
          console.error('Error fetching single tour:', error);
        }
      },
      // Get tours by vehicle
    async getToursByVehicle({ commit }, vehicle) {
      try {
        const encodedVehicle = encodeURIComponent(vehicle);
        const res = await axios.get(`http://localhost:8000/api/tour/search/tourByVehicle?vehicle=${encodedVehicle}`);
        commit('setToursByVehicle', res.data.data);
        } catch (error) {
        console.error('Error fetching tours by vehicle:', error);
        }
      },
};

const getters = {
  getTours: state => state.tours,
  getSingleTour: state => state.singleTour,
  getDeletedTours: state => state.deletedTours,
  getToursByVehicle: state => state.tourByVehicle,
  getToursFeatured: state => state.toursFeatured,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
