<template>
    <nav class="navbar green">
        <div class="navbar-brand">
            <div v-if="this.$route.params.lang == 'fr'">
            <a href="https://parkpeople.ca"><img src="https://parkpeople.ca/listings/custom/themes/parkpeople/dist/images/parkpeople-logo-PMS.png" style="width: 80px; height: auto; padding: 15px 10px 10px;"></a>
            </div>
            <div v-else>
                <a href="https://parkpeople.ca" class="lang"><img src="https://parkpeople.ca/listings/custom/themes/parkpeople/dist/images/parkpeople-logo-PMS.png" style="width: 80px; height: auto; padding: 10px; padding: 15px 10px 10px;"></a>
            </div>
        </div>
        <div class="lang">
            <!-- <router-link v-if="this.$route.params.lang == 'fr'" to="/en" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en'" to="/fr" class="lang">FR</router-link> -->
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-end">
                <a v-if="this.$route.params.lang == 'en'" href="https://parkpeople.ca" class="navbar-item">Home</a> 
                <a v-if="this.$route.params.lang == 'fr'" href="https://parkpeople.ca" class="navbar-item">Page d'accueil</a>
                <a v-if="this.$route.params.lang == 'fr'" href="https://parkpeople.ca/boursesdeparc" class="navbar-item">Retour à Bourses</a>  
                <a v-if="this.$route.params.lang == 'en'" href="https://parkpeople.ca/parkgrants" class="navbar-item" exact>Back to grant page</a>             
            </div>
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