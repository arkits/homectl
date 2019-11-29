<template>
<v-card class="mx-auto" max-width="344">
    <v-card-actions class="d-flex justify-center">
        <v-btn class="plex-button" text @click="toggleDevice(true)">all on</v-btn>
        <v-btn class="plex-button" text @click="toggleDevice(false)">all off</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import Config from '@/config';
import store from "../store";

const axios = require('axios');

export default {
    name: "QuickReach",
    methods: {
        toggleDevice(deviceState) {

            var devices = store.getters.getDevices;

            for (let key in devices) {

                let device = devices[key];

                axios.post(Config.backendApi + '/api/devices/power', {
                        ip: device.ip,
                        is_on: deviceState

                    })
                    .then((response) => {
                        // console.log("Batch Toggled device - ", device.alias);
                        device.is_on = response.data.is_on;
                        this.$store.commit("addDevice", device);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        }
    }
};
</script>
