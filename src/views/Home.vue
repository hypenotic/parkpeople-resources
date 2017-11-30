<template>
	<div>
        <app-filter></app-filter>
        <app-card></app-card>
	</div>
</template>

<script>
    import Filter from '../components/Filter.vue';
    import CardList from '../components/CardList.vue';
    export default {
    components: {
        appCard: CardList,
        appFilter: Filter
    }
}
</script>

<style lang="scss">

</style>