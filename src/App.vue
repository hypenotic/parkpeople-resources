<template>
  <div class="container">
    <h1>Routing </h1>  
    <hr>
    <!--Mark the place where the route should load-->
    <app-header></app-header>
    <router-view></router-view>
</div>
</template>

<script>
  import Header from './components/Shared/Header.vue';
  export default {
    components: {
      appHeader: Header
    }
}
</script>

<style lang="scss">

</style>
