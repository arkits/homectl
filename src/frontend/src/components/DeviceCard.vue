<template>
<v-container>
    <v-layout>
        <v-flex mb-4>
            <v-card class="mx-auto" max-width="344">

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">{{alias}}</v-list-item-title>
                        <v-list-item-subtitle>{{ip}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <div v-if="deviceStatus == true">
                        <v-list-item-avatar size="80" color="green" @click="toggleDevice()">ON</v-list-item-avatar>
                    </div>
                    <div v-else>
                        <v-list-item-avatar size="80" color="orange" @click="toggleDevice()">OFF</v-list-item-avatar>
                    </div>
                </v-list-item>

            </v-card>
        </v-flex>

    </v-layout>
</v-container>
</template>

<script>
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
            axios.post('http://192.168.86.33:5001/api/devices/toggle', {
                    ip: this.ip
                })
                .then((response) => {
                    console.log(response);
                    this.real_is_on = response.data.is_on;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed:{
        deviceStatus(){
            if(this.real_is_on === null){
                return this.is_on;
            } else {
                return this.real_is_on;
            }
        }
    }
};
</script>
