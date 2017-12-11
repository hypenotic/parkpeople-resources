import Vue from 'vue'
import App from './App.vue'
// After install add Vue Router to our main app
import VueRouter from 'vue-router'
import { routes } from './routes'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'


// Use
Vue.use(Buefy);

/* With the Vue Router imported 
we can then tell the app to use it */
Vue.use(VueRouter);

const router = new VueRouter({
	routes, // Have to pass an object where we setup the router. ES6 syntax (routes:routes)
	mode: 'history' // Remove the hash
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
