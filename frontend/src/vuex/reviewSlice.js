// store/reviewSlice.js
import axios from 'axios';
const state = {
  reviews: [],
};

const mutations = {
    createTour(state,newReview){
        state.reviews.push(newReview)
    },
    setReviews(state,reviews){
        state.reviews = reviews
    },
};

const actions = {

    // create review
    async createReview({ commit }, {TourId, reviewData} ) {
        try {
          const res = await axios.post(`http://localhost:8000/api/review/${TourId}`,{ ...reviewData});
          commit('createTour', res.data.data);
          return res.data.data; 
        } catch (error) {
          console.error('Error creating tour:', error);
          throw error; 
        }
      },
    //get all reviews
  async getAllReviews({ commit }) {
    try {
      const res = await axios.get('http://localhost:8000/api/review');
      commit('setReviews', res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
};

const getters = {
    getAllReviews: state => state.reviews,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
