/* need to import the components for the 
route*/

import Home from './views/Home.vue';
import CaseStudy from './views/CaseStudy.vue';
import Research from './views/Research.vue';
import Resource from './views/Resource.vue';

/* export a const names routes with will 
hold my routes. Holding routes means it has 
an array which has objects which represent a route.
*/

export const routes = [
	/*path will be appended to URL,
	then need the component to load*/
	{ path:'/', component: Home },
	{ path:'/case-study/:slug', component: CaseStudy },
	{ path:'/research/:slug', component: Research },
	{ path:'/resource/:slug', component: Resource },
	//{ path:'/resource/:id', component: Resource },
]