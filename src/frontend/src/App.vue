<template>
<v-app>
    <v-app-bar app>
        <v-toolbar-title class="headline">
            <span>Home Dashboard</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
        <br>
        <div v-if="is_loading">
            <center>
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </center>
        </div>
        <div v-else>
            <div v-for="(value, name) in devices" v-bind:key="name">
                <DeviceCard v-bind:alias=value.alias v-bind:ip=value.ip v-bind:is_on=value.is_on />
            </div>
        </div>

    </v-content>
</v-app>
</template>

<script>

import Config from '@/config';

const axios = require('axios');

import DeviceCard from "./components/DeviceCard";

export default {
    name: "App",
    components: {
        DeviceCard
    },
    methods: {

    },
    data: function () {
        return {
            devices: {},
            is_loading: true
        }
    },
    created() {

        this.$vuetify.theme.dark = true;

        console.log("Getting devices...");
        axios.get(Config.backendApi + '/api/devices')
            .then((response) => {
                this.is_loading = false;
                console.log("Got " + response.data.length + " devices.");
                for (var i = 0; i < response.data.length; i++) {
                    var device = response.data[i];
                    this.devices[device.ip] = device;
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }
};
</script>
