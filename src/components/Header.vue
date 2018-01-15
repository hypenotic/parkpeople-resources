<template>
    <nav class="navbar green">
        <div class="navbar-brand">
            <div v-if="this.$route.params.lang == 'fr'">
            <router-link to="/fr"><img src="https://parkpeople.ca/listings/custom/themes/parkpeople/dist/images/parkpeople-logo-PMS.png" style="width: 80px; height: auto; padding: 10px;"></router-link>
            </div>
            <div v-else>
                <router-link to="/en" class="lang"><img src="https://parkpeople.ca/listings/custom/themes/parkpeople/dist/images/parkpeople-logo-PMS.png" style="width: 80px; height: auto; padding: 10px;"></router-link>
            </div>
        </div>
        <div class="lang">
            <router-link v-if="this.$route.params.lang == 'fr'" to="/en" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en'" to="/fr" class="lang">FR</router-link>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <!-- <div class="navbar-end">
                <a href="https://parkpeople.ca" class="navbar-item">Home</a> 
                <router-link v-if="this.$route.params.lang == 'fr' && this.$route.path != '/fr'" to="/fr" class="navbar-item" exact>Retour à toutes les ressources</router-link>  
                <router-link v-if="this.$route.params.lang == 'en' && this.$route.path != '/en'" to="/en" class="navbar-item" exact>Back to all resources</router-link>             
            </div> -->
        </div>
    </nav>
</template>

<script>
import { eventBus } from '../main.js';
export default {
    data() {
        return {
            // id: this.$route.params.id,
            lang: this.$route.params.lang
        }
    },
};
</script>

<style lag="scss" scoped>
.green {
    background-color: #067f1b;
}

.lang {
    color: white;
    margin: 1em;
}

.navbar-item {
    color: white;
}

.grants-logo {
    max-height: 55px;
    width: auto;
    margin-top: 3px;
    margin-left: 8px; 
}
</style>