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
    import Header from './components/Shared/Header.vue';
    import Footer from './components/Shared/Footer.vue';
    export default {
    components: {
        appHeader: Header,
        appFooter: Footer
    }
}
</script>

<style lang="scss">

</style>
