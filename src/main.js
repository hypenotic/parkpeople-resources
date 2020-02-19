import Vue from 'vue'
// import Vuex from 'vuex'
import store from './store'
import App from './App.vue'
// After install add Vue Router to our main app
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import { routes } from './routes'
var SocialSharing = require('vue-social-sharing');
import VuePaginate from 'vue-paginate'

Vue.config.devtools = true
Vue.use(SocialSharing);
Vue.use(VuePaginate);
Vue.use(VueRouter);

const router = new VueRouter({
	routes, // Have to pass an object where we setup the router. ES6 syntax (routes:routes)
	mode: 'history', // Remove the hash
	base: '/resources',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})

Vue.use(VueAnalytics, {
	id: 'UA-73699301-1',
	router
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
