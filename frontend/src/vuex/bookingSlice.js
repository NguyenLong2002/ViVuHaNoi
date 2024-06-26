const state = {
  bookingInfo: JSON.parse(localStorage.getItem('bookingInfo')) || {
    selectedDate: null,
    numAdults: 0,
    numChildren: 0,
    totalAmount: 0
  }
  };
  
  const mutations = {
    setBookingInfo(state, payload) {
        state.bookingInfo = { ...payload };
      }
  };
  
  const actions = {
    async updateBookingInfo({ commit }, payload) {
        commit('setBookingInfo', payload);
        localStorage.setItem('bookingInfo', JSON.stringify(payload));
      }
  };
  
  const getters = {
    updateBookingInfo: state => state.bookingInfo
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  