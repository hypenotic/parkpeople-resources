/* need to import the components for the 
route*/

import Home from './components/Home.vue';
import CaseStudy from './components/CaseStudy.vue';
import Research from './components/Research.vue';
import Resource from './components/Resource.vue';

/* export a const names routes with will 
hold my routes. Holding routes means it has 
an array which has objects which represent a route.
*/

export const routes = [
	/*path will be appended to URL,
	then need the component to load*/
	{ path:'/', component: Home },
	{ path:'/case-study/', component: CaseStudy },
	{ path:'/research/:slug', component: Research },
	{ path:'/resource/:slug', component: Resource },
]