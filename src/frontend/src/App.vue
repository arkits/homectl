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
        <div v-if="devices.length == 0">
            <center>
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </center>
        </div>
        <div v-else>
            <div v-for="item in devices" v-bind:key="item.id">
                <DeviceCard v-bind:alias=item.alias v-bind:ip=item.ip v-bind:is_on=item.is_on />
            </div>
        </div>

    </v-content>
</v-app>
</template>

<script>
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
            devices: []
        }
    },
    created() {

        this.$vuetify.theme.dark = true;

        console.log("Getting devices...");
        axios.get('http://127.0.0.1:5000/api/devices')
            .then((response) => {
                console.log("Got " + response.data.length + " devices.");
                for (var i = 0; i < response.data.length; i++) {
                    var device = response.data[i];
                    device.id = i;
                    console.log(device)
                    this.devices.push(device);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }
};
</script>
