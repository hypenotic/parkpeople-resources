/* need to import the components for the 
route*/

import Home from './views/Home.vue';
import CaseStudy from './views/CaseStudy.vue';
import Research from './views/Research.vue';
import Resource from './views/Resource.vue';
import Grants from './views/Grants.vue';
import Single from './views/Single.vue';

/* export a const names routes with will 
hold my routes. Holding routes means it has 
an array which has objects which represent a route.
*/

export const routes = [
	/*path will be appended to URL,
	then need the component to load*/
	{ path:'/:lang/case-study/:id/:slug', component: CaseStudy, props: true },
	{ path:'/:lang/research/:id/:slug', component: Research, props: true },
	{ path:'/:lang/resource/:id/:slug', component: Resource, props: true },
<<<<<<< HEAD
	{ path:'/:lang', redirect: to => {
		// the function receives the target route as the argument
		// return redirect path/location here.
		window.location = "https://parkpeople.ca"
	  } },
	{ path:'/', redirect: to => {
		// the function receives the target route as the argument
		// return redirect path/location here.
		window.location = "https://parkpeople.ca"
	} }
=======
	{ path:'/:lang', component: Home, props: true },
	{ path:'/', redirect: '/en' }
	// { path:'/:lang', redirect: to => {
	// 	// the function receives the target route as the argument
	// 	// return redirect path/location here.
	// 	window.location = "https://parkpeople.ca"
	//   } },
	// { path:'/', redirect: to => {
	// 	// the function receives the target route as the argument
	// 	// return redirect path/location here.
	// 	window.location = "https://parkpeople.ca"
	// } }
>>>>>>> revamp
]