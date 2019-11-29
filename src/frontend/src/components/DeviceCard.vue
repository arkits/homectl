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

                    <div v-if="is_on == true">
                        <v-btn class="mx-2" fab dark large color="green darken-2" @click="toggleDevice()">
                            ON
                        </v-btn>
                    </div>
                    <div v-if="is_on == false">
                        <v-btn class="mx-2" fab dark large color="grey darken-3" @click="toggleDevice()">
                            OFF
                        </v-btn>
                    </div>
                    <div v-if="is_on === null">
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
    }),
    methods: {
        toggleDevice() {
            // console.log("Single Toggling device - ", this.alias);
            axios.post(Config.backendApi + '/api/devices/power', {
                    ip: this.ip,
                    is_on: !this.is_on
                })
                .then((response) => {
                    var device = {
                        'alias': this.alias,
                        'ip': this.ip,
                        'is_on': response.data.is_on
                    };
                    this.$store.commit("addDevice", device);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>
