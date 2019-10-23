import Vue from 'vue'
import Vuex from 'vuex'
import _ from "lodash"

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
      console.log("Add devices - ", device.alias, device.is_on, device.ip);

      var devicesCopy = _.cloneDeep(state.devices);

      devicesCopy[device.ip] = device;

      state.devices = Object.assign({}, devicesCopy);


      state.devices[device.ip] = device;
    },
    clearDevice: function(state, device){
      delete state.devices[device.ip];
    },
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
