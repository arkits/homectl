<template>
<div>
    <QuickReach />
    <br>
    <div v-if="is_loading">
        <center>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </center>
    </div>
    <div v-else>
        <div v-for="(value, id) in getDevicesFromStore" v-bind:key="id">
            <DeviceCard v-bind:alias=value.alias v-bind:ip=value.ip v-bind:is_on=value.is_on />
        </div>
    </div>
</div>
</template>

<script>
const axios = require('axios');

import Config from '@/config';
import DeviceCard from "./DeviceCard";
import QuickReach from "./QuickReach";
import store from "../store";

export default {
    name: "DeviceList",
    components: {
        DeviceCard,
        QuickReach
    },
    data: function () {
        return {
            devices: {},
            is_loading: true
        }
    },
    computed: {
        getDevicesFromStore() {
            return store.getters.getDevices;
        }
    },
    created() {
        axios.get(Config.backendApi + '/api/devices')
            .then((response) => {
                this.is_loading = false;
                for (var device of response.data) {
                    device.is_on = null;
                    this.$store.commit("addDevice", device);
                }
                console.log("Got devices - ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(Config.backendApi + '/api/devices/refresh')
            .then((response) => {
                this.$store.commit("clearDevices");
                for (var device of response.data) {
                    this.$store.commit("addDevice", device);
                }
                console.log("Refreshed devices - ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
