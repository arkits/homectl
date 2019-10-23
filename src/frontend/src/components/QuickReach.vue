<template>
        <v-card class="mx-auto" max-width="344">
            <v-card-actions class="d-flex justify-center">
                <v-btn class="plex-button" text @click="allOn()">all_on</v-btn>
                <v-btn class="plex-button" text @click="allOff()">all_off</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import Config from '@/config';

const axios = require('axios');

export default {
    name: "QuickReach",
    methods: {
        allOn() {
            console.log("All On");
        },
        allOff() {
            console.log("All Off");
        }
    }
};
</script>
