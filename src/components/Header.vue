<template>
    <nav class="navbar green">
        <div class="navbar-brand">
            <a><img src="https://parkpeople.ca/listings/custom/themes/parkpeople/dist/images/parkpeople-logo-PMS.png" style="width: 80px; height: auto; padding: 10px;"></a>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-end">
                <router-link to="/" class="navbar-item" exact>Home</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
	export default {	
	};
</script>

<style scoped>
.green {
    background-color: #067f1b;
}

.navbar-item {
    color: white;
}
</style>