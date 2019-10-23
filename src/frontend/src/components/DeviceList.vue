<template>
<div v-if="is_loading">
    <center>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </center>
</div>
<div v-else>
    <div v-for="(value, id) in devices" v-bind:key="id">
        <DeviceCard v-bind:alias=value.alias v-bind:ip=value.ip v-bind:is_on=value.is_on />
    </div>
</div>
</template>

<script>
const axios = require('axios');

import Config from '@/config';
import DeviceCard from "./DeviceCard";

export default {
    name: "DeviceList",
    components: {
        DeviceCard
    },
    data: function () {
        return {
            devices: {},
            is_loading: true
        }
    },
    created() {
        axios.get(Config.backendApi + '/api/devices')
            .then((response) => {
                this.is_loading = false;
                for(var device of response.data){
                    device.is_on = null;
                    this.devices[device.ip] = device;
                }
                console.log("Got devices - ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(Config.backendApi + '/api/devices/refresh')
            .then((response) => {
                this.devices = {};
                for(var device of response.data){
                    this.devices[device.ip] = device;
                }
                console.log("Refreshed devices - ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
