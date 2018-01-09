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
								<div v-html="$options.filters.readMore(post.excerpt.rendered, 100, '...')"></div>
								<div v-if="post.pure_taxonomies.activity" class="activity-list-container">
									<b>Do in parks:</b>
									<ul class="card__activity-list">
										<li v-for="tax in post.pure_taxonomies.activity">{{ tax.name | toUppercase }}</li>
									</ul>
								</div>
								<div v-if="post.pure_taxonomies.learn" class="activity-list-container">
									<b>Know about parks:</b>
									<ul class="card__learn-list">
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
	<!-- <div class="skewed-bg"></div> -->
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
			categoryList: []
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
				let postsList = this.posts;
				let byDate = postsList.sort(function(a,b){
					return new Date(b.date) - new Date(a.date)
				})	
				return byDate
			} else {
				let filterMatches = [];
				for(let i = 0; i < this.posts.length; i++) {
			
					let combined = [];

					if (this.posts[i].pure_taxonomies.hasOwnProperty("learn")) {
						for(let p = 0; p < this.posts[i].pure_taxonomies.learn.length; p++) {
							combined.push(this.posts[i].pure_taxonomies.learn[p]['name']);
						}
					}

					if (this.posts[i].pure_taxonomies.hasOwnProperty("activity")) {
						for(let p = 0; p < this.posts[i].pure_taxonomies.activity.length; p++) {
							combined.push(this.posts[i].pure_taxonomies.activity[p]['name']);
						}
					}

					var findOne = function (haystack, arr) {
						return arr.some(function (v) {
							return haystack.indexOf(v) >= 0;
						});
					}

					var test = findOne(combined,this.categoryList)

					// console.log(i,test,combined,this.categoryList)

					if (test == true) {
						filterMatches.push(this.posts[i])
					}
					
				}
				filterMatches.sort(function(a,b){
					return new Date(b.date) - new Date(a.date)
				})	
				return filterMatches
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
		// Check if we have already made calls to get the resources
		// Technically we could just call 
		if(this.$store.state.resourceList.length > 0) {
			// If resourceList in the store (an array) has any items, just use the store data
			console.log('NO CALL')
			this.posts = this.$store.state.resourceList
		} else {
			// Else, we have no data, so make the calls
			console.log('CALLING')
			axios.all([
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=100'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=100'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=100')
			])
			.then(axios.spread((response, response1, response2) => {
				
				let allPosts  = response.data.concat(response1.data, response2.data);
				this.posts = allPosts
				this.$store.commit('SET_RESOURCES', allPosts)

			}))
			.catch(e => {
				this.errors.push(e)
			})
		}
		
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.section {
	background-color: #ecebeb;
}

.content a h4 {
	color: rgba(30,177,242, 1);
	font-size: 1.2rem;
	line-height: 1.8rem;
	font-weight: 700;
	// line-height: 1.4;
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

.content {
	p {
		font-size: 0.8rem;
		line-height: 1.3rem;
	}
	ul {
		list-style-type: none;
		margin: 0 0 10px 0;
		li { 
			color: rgba(0,0,0,0.5);
			display: inline;
			font-weight: 700;
			&:not(:last-child):after {
				content: ", ";
			}
		}
	}
}

.card__activity-list,
.card__learn-list {
	li {
		font-family: $family-sanserif;
		// color: $blue;
		display: inline-block;
	}
}

</style>