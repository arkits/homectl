import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: {}
  },
  mutations: {
    clearDevices: function(state){
      state.devices = {};
    },
    addDevice: function(state, device){
      state.devices[device.ip] = device;
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getDevices: state =>{
      return state.devices;
    }
  }
})
