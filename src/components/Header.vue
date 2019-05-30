<template>
    <nav v-if="scrolled == true" id="scrolling" class="navbar green">
        <div class="navbar-brand">
            <div v-if="this.$route.params.lang == 'fr'">
            <a href="https://parkpeople.ca"><img src="https://parkpeople.ca/listings/custom/uploads/2019/05/Logo_Bilingual_horizontal_white.png" style="width: auto; height: 50px;margin-left: 12px;margin-top: 5px;"></a>
            </div>
            <div v-else>
                <a href="https://parkpeople.ca"><img src="https://parkpeople.ca/listings/custom/uploads/2019/05/Logo_Bilingual_horizontal_white.png" style="width: auto; height: 50px;margin-left: 12px;margin-top: 5px;"></a>
            </div>
        </div>
        <div class="lang">
            <router-link v-if="this.$route.params.lang == 'fr' && this.$route.path == '/en'" to="/en" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en' && this.$route.path == '/fr'" to="/fr" class="lang">FR</router-link>
            <router-link v-if="this.$route.params.lang == 'fr' && this.$store.state.translatedCheck == true" to="/en" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en' && this.$store.state.translatedCheck == true" to="/fr" class="lang">FR</router-link>
        </div>

        <div id="mobile-menu-trigger" v-on:click="showMobileMenu = !showMobileMenu">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'menu-open': showMobileMenu }">
            <div class="navbar-end">
                <a v-if="this.$route.params.lang == 'en'" href="https://parkpeople.ca" class="navbar-item">Home</a> 
                <a v-if="this.$route.params.lang == 'fr'" href="https://parkpeople.ca" class="navbar-item">Page d'accueil</a>
                <a v-if="this.$route.params.lang == 'fr' && this.$store.state.grantsCheck== true" href="https://parkpeople.ca/boursesdeparc" class="navbar-item">Bourses TD Park People</a>  
                <a v-if="this.$route.params.lang == 'en' && this.$store.state.grantsCheck== true" href="https://parkpeople.ca/parkgrants" class="navbar-item" exact>TD Park People Grants</a>  
                <!-- <a v-if="this.$route.params.lang == 'fr' && this.$route.path != '/fr'" href="/" class="navbar-item">Toutes les ressources</a>  
                <a v-if="this.$route.params.lang == 'en' && this.$route.path != '/en'" href="/" class="navbar-item">All Resources</a>             -->
                <router-link v-if="this.$route.params.lang == 'fr' && this.$route.path != '/fr'" to="/fr" class="navbar-item">Toutes les ressources</router-link>
                <router-link v-if="this.$route.params.lang == 'en' && this.$route.path != '/en'" to="/en" class="navbar-item">All Resources</router-link> 
            </div>
        </div>
    </nav>
    <nav v-else class="navbar green">
        <div class="navbar-brand">
            <div v-if="this.$route.params.lang == 'fr'">
            <a href="https://parkpeople.ca"><img src="https://parkpeople.ca/listings/custom/uploads/2019/05/Logo_Bilingual_horizontal_white.png" style="width: auto; height: 50px;margin-left: 12px;margin-top: 5px;"></a>
            </div>
            <div v-else>
                <a href="https://parkpeople.ca"><img src="https://parkpeople.ca/listings/custom/uploads/2019/05/Logo_Bilingual_horizontal_white.png" style="width: auto; height: 50px;margin-left: 12px;margin-top: 5px;"></a>
            </div>
        </div>
        <div class="lang">
            <router-link v-if="this.$route.params.lang == 'fr' && this.$route.path == '/fr'" to="/en" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en' && this.$route.path == '/en'" to="/fr" class="lang">FR</router-link>
            <router-link v-if="this.$route.params.lang == 'fr' && this.$store.state.translatedCheck == true" :to="this.$store.state.translatedURL" class="lang">EN</router-link>
            <router-link v-if="this.$route.params.lang == 'en' && this.$store.state.translatedCheck == true" :to="this.$store.state.translatedURL" class="lang">FR</router-link>
        </div>

        <div id="mobile-menu-trigger" v-on:click="showMobileMenu = !showMobileMenu">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'menu-open': showMobileMenu }">
            <div class="navbar-end">
                <a v-if="this.$route.params.lang == 'en'" href="https://parkpeople.ca" class="navbar-item">Home</a> 
                <a v-if="this.$route.params.lang == 'fr'" href="https://parkpeople.ca" class="navbar-item">Page d'accueil</a>
                <a v-if="this.$route.params.lang == 'fr' && this.$route.query.bourses== 'true'" href="https://parkpeople.ca/boursesdeparc" class="navbar-item">Bourses TD Park People</a>  
                <a v-if="this.$route.params.lang == 'en' && this.$route.query.grants == 'true'" href="https://parkpeople.ca/parkgrants" class="navbar-item">TD Park People Grants</a> 
                <!-- <a v-if="this.$route.params.lang == 'fr' && this.$route.path != '/fr'" href="/" class="navbar-item">Toutes les ressources</a>  
                <a v-if="this.$route.params.lang == 'en' && this.$route.path != '/en'" href="/" class="navbar-item">All Resources</a>                -->
                <router-link v-if="this.$route.params.lang == 'fr' && this.$route.path != '/fr'" to="/fr" class="navbar-item">Toutes les ressources</router-link>
                <router-link v-if="this.$route.params.lang == 'en' && this.$route.path != '/en'" to="/en" class="navbar-item">All Resources</router-link> 
            </div>
        </div>
    </nav>
</template>

<script>
// import { eventBus } from '../main.js';
export default {
    data() {
        return {
            // id: this.$route.params.id,
            lang: this.$route.params.lang,
            showMobileMenu: false,
            scrolled: false
        }
    },
    methods: {
        handleScroll: function (event) {
            if (window.addEventListener){
                // console.log('A');
                // console.log(pageYOffset);
                if (window.pageYOffset > 20) {
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            } else if (window.attachEvent){
                // console.log('B');
                if (window.scrollY > 20) {
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            } else {
                if (window.pageYOffset > 20) {
                    // console.log('C');
                    this.scrolled = true;
                } else {
                    this.scrolled = false;	
                }
            }
        }
    },
    created: function () {
        console.log('header check', this.$store.state.translatedCheck);
        // window.addEventListener('scroll', this.handleScroll);
        if (window.addEventListener){
            // console.log('Option 1');
            window.addEventListener('scroll', this.handleScroll);
        } else if (window.attachEvent){
            // console.log('Option 2');
            window.attachEvent('scroll', this.handleScroll);
        } else {
            // console.log('Option 3');
            jQuery(window).on('scroll', this.handleScroll);
            // console.log('IE');
        }
    },
    destroyed: function () {
        // window.removeEventListener('scroll', this.handleScroll);
        if (window.addEventListener){
            window.removeEventListener('scroll', this.handleScroll);
        } else if (window.attachEvent){
            window.detachEvent('scroll', this.handleScroll);
        } else {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.green {
    background-color: #067f1b;
}

nav {
    position: relative;
    z-index: 999999999999;
    @media print {
		display: none;
	}
}

nav#scrolling {
    @media #{$small-and-down} {
		display: block;
		position: fixed; 
        width: 100%;
        z-index: 6000;
        height: 50px;
        top: 0;
    }
}

#mobile-menu-trigger {
	display: none;
	&:hover {
		cursor: pointer;
	}
	i {
		color: $white;
		font-size: 30px;
	}
	@media #{$small-and-down} {
		display: block;
		position: fixed; 
		right: 30px;
		top: 15px;
		z-index: 50000;
    }
	
}

.navbar {
    @media #{$small-and-down} {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 5000;
    }
}

.navbar-brand {
    @media #{$small-and-down} {
        display: inline-block;
        img {
            min-height: 50px;
            width: auto;
        }
    }
}

.navbar-menu {
    a {
        color: $white;
        &:hover {
            color: $blue;
            background: $white;
        }
    }
    span {
        &:hover {
            background: $white;
            color: $blue;
            a {
                color: $blue;
            }
        }
    }
}

.navbar-menu.menu-open {
    @media #{$small-and-down} {
        position: absolute;
        display: inline-block;
        top: 55px;
        width: 100%;
        background:  #067f1b;
    }
}

div.lang {
    display: flex;
    align-items: center;
}

a.lang {
    color: white;
    margin: 0 0 0 1em;
    // height: 100%;
    display: block;
    position: relative;
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