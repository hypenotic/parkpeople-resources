<template v-if="posts && posts.length">
<div>
	<section class="section">
		<div class="container">
			<div class="columns is-multiline">
  				<div class="column is-one-quarter" v-for="(post,index) in filteredList" :key='index'>
    				<!-- <div class="card" :data-category="getDataAtt(post)"> -->
						<div class="card">
  						<div class="card-image">
							<figure class="image is-2by1">
								<img v-if="post._embedded['wp:featuredmedia'] != undefined" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
							</figure>
						</div>
  						<div class="card-content">
							<div class="content">
								<router-link :to="post.type + '/' + post.id + '/' + post.slug"><h4 v-html="post.title.rendered"></h4></router-link>
								<p v-html="$options.filters.readMore(post.excerpt.rendered, 100, '...')"></p>
								<div v-if="post.pure_taxonomies.activity">
									<b>Do in parks</b>
									<ul>
										<li v-for="tax in post.pure_taxonomies.activity">{{ tax.name | toUppercase }}</li>
									</ul>
								</div>
								<div v-if="post.pure_taxonomies.learn">
									<b>Know about parks</b>
									<ul>
										<li v-for="tax in post.pure_taxonomies.learn">{{ tax.name | toUppercase }}</li>
									</ul>
								</div>
								<small>{{ post.type | removeHyphen | toTitleCase }}</small>
    						</div>
  						</div>
					</div>
  				</div>
			</div>
		</div>
	</section>
	<div class="skewed-bg"></div>
</div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main.js';
export default {
	data() {
		return {
			posts: [],
			errors: [],
			categoryList: [],
		};
	},
	filters: {
		removeHyphen(value){
			return value.replace("-", ' ');
		},
		capitalizeFirstLetter(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
		toUppercase(value) {
			return value.toUpperCase();
		},
		readMore(value, length, suffix) {
			if (value.length < length)
			return value;	
			return value.substring(0, length) + suffix;
		},
		stripHTML(value) {
			return value.replace(/(<([^>]+)>)/ig,"");
		},
		toTitleCase(value) {
    		return value.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		},
	},
	computed:{
        filteredList(){
        	if (!this.categoryList.length) {
				return this.posts
			} else {
				for(let i = 0; i < this.posts.length; i++) {
					return this.posts.filter(j => this.categoryList.includes(j.pure_taxonomies.learn[i].name))
				}
			}
		},
    },
	methods: {
		getDataAtt(post) {
			/* 
			getDataAtt() loops through category names of a loaded post and pushes them to a new array. 
			The categories are used in the data-category attribute for filtering.
			*/
			const categories = [];
			let allCats = [];
			let cat1 = post.pure_taxonomies.activity;
			let cat2 = post.pure_taxonomies.learn;
			let i;
			
			if(typeof(cat1) != 'undefined'){
				allCats = cat1.concat(cat2);
			} else if(typeof(cat2) != 'undefined') {
				allCats = cat2.concat(cat1);
			} else {
				return;
			}

			for(i = 0; i < allCats.length; i++) {
				if (typeof(allCats[i]) != 'undefined') {
					categories.push(allCats[i].name)
				}
			}
			return categories;
		},
	},
	mounted() {
		eventBus.$on('checked', checkedCategories => {
			this.categoryList = checkedCategories
		})
	},
	created() {
		axios.all([
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=1'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=8'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=5')
		])
		.then(axios.spread((response, response1, response2) => {
			
			let allPosts  = response.data.concat(response1.data, response2.data);
			//console.log(allPosts)
			this.posts = allPosts
		}))
		.catch(e => {
			this.errors.push(e)
		})
	},
};
</script>

<style lang="scss" scoped>

.section {
	background-color: #ecebeb;
}

.content a h4 {
	color: rgba(30,177,242, 1);
	font-size: 1.4rem;
	font-weight: 700;
	line-height: 1.4;
	&:hover {
		color: rgba(30,177,242,0.7);
	}
}

.skewed-bg{
  	background: #ecebeb;
 	padding: 100px 0;
	transform: skew(0deg, -5deg);
  	margin-top: -130px;
	position: relative;
	z-index: -1;
}

img {
	object-fit: cover;
}

.card {
	display:flex;
    flex-direction: column;
	height: 100%;
}

ul {
	list-style-type: none;
	margin: 0 0 10px 0;
	li { 
		color: rgba(0,0,0,0.5);
		display: inline;
		font-weight: 700;
		&:not(:last-child):after {
			content: " | ";
		}
	}
}

</style>