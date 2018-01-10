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
	{ path:'/', component: Home, props: true },
	{ path:'/case-study/:id/:slug', component: CaseStudy, props: true },
	{ path:'/research/:id/:slug', component: Research, props: true },
	{ path:'/resource/:id/:slug', component: Resource, props: true },
	{ path:'/grants', component: Grants, props: true },
	{ path:'/faq', component: Single, props: true },
]