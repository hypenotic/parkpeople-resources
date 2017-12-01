<template>
             <div>
    
        <app-header></app-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';
    export default {
    components: {
        appHeader: Header,
        appFooter: Footer
    }
}
</script>

<style lang="scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";
@import url('https://fonts.googleapis.com/css?family=Dosis|Comfortaa');

$family-cursive: "Comfortaa", cursive;
$family-sanserif: "Dosis", sans-serif;

html, body {
    font-size: 16px;
    font-family: $family-cursive;
}

p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
    margin-bottom: 1rem;
}

h1 {
    font-size: 5.063rem;
    margin-bottom: 0;
}

h2 {
    font-size: 3.375rem;
}

h3 {
    font-size: 2.75rem;
}

h4 {
    font-size: 2.25rem;
}

h5 {
    font-size: 1.833rem;
}

h6 {
    font-size: 1.222rem;
    font-weight: bold;
}

small {
    font-size: 0.815rem;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
}

.wfs-loading {
    visibility: hidden;
}

.wfs-active, .wf-inactive {
    visibility: visible;
}
</style>