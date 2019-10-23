<template>
<v-container>
    <v-layout>
        <v-flex mb-4>
            <v-card class="mx-auto" max-width="344">
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{alias}}</v-list-item-title>
                        <v-list-item-subtitle>{{ip}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <div v-if="deviceStatus == true">
                        <v-btn class="mx-2" fab dark large color="green" @click="toggleDevice()">
                            ON
                        </v-btn>
                    </div>
                    <div v-if="deviceStatus == false">
                        <v-btn class="mx-2" fab dark large color="grey darken-4" @click="toggleDevice()">
                            OFF
                        </v-btn>
                    </div>
                    <div v-if="deviceStatus === null">
                        <v-progress-circular indeterminate color="grey"></v-progress-circular>
                    </div>

                </v-list-item>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import Config from '@/config';

const axios = require('axios');

export default {
    name: "DeviceCard",
    props: [
        'alias',
        'ip',
        'is_on'
    ],
    data: () => ({
        real_is_on: null
    }),
    methods: {
        toggleDevice() {
            console.log("Toggling Device");
            axios.post(Config.backendApi + '/api/devices/toggle', {
                    ip: this.ip
                })
                .then((response) => {
                    this.real_is_on = response.data.is_on;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {
        deviceStatus() {
            if (this.real_is_on === null) {
                return this.is_on;
            } else {
                return this.real_is_on;
            }
        }
    }
};
</script>
