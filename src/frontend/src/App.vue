<template>
<v-app>
    <v-app-bar app class="green darken-3">
        <v-toolbar-title class="headline">
            <span class="org-title">~/</span>
            <span>
                <a href="/" class="app-title white--text">smarthome-dashboard</a>
            </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
        <br> <br>
        <DeviceList />
    </v-content>
</v-app>
</template>

<script>
import DeviceList from "./components/DeviceList";


export default {
    name: "App",
    components: {
        DeviceList
    },
    created() {
        this.$vuetify.theme.dark = true;
    }
};
</script>

<style>
.org-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 300;
    font-style: italic;
}

.plex-button {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
}

.app-title {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 700;
    font-style: italic;
    text-decoration: none;
}
</style>
