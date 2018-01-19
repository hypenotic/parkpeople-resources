<template v-if="posts && posts.length > 0">
<div>
	<section class="section">
		<div class="container">
			<paginate name="postList" :list="filteredList" :per="16" tag="div">
				<div class="columns is-multiline">
					<div class="column is-one-quarter" v-for="post in paginated('postList')" :key="post.id">
						<div class="card">
							<div class="card-image">
								<figure class="image is-2by1">
									<img v-if="post._embedded.hasOwnProperty('wp:featuredmedia') && lang != 'fr'" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
									<img v-else-if="post._embedded.hasOwnProperty('wp:featuredmedia') && lang == 'fr'" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
									<img v-else src="https://parkpeople.ca/listings/custom/uploads/2018/01/placeimg_1000_500_nature2.jpg" alt="default park image">
								</figure>
							</div>
							<div class="card-content">
								<div class="content">
									<small v-if="lang == 'fr'" style="font-family: 'Dosis';font-size: 12px;">{{ $options.filters.translatedType(post.type) }}</small>
									<small v-else style="font-family: 'Dosis';font-size: 12px;"> {{ post.type | removeHyphen | toTitleCase }}</small>
									<router-link :to="lang+'/'+post.type + '/' + post.id + '/' + post.slug"><h4 v-html="post.title.rendered"></h4></router-link>
									<div v-html="$options.filters.readMore(post.excerpt.rendered, 100, '...')"></div>
									<div v-if="post.pure_taxonomies.activity && lang == 'fr'" class="activity-list-container">
										<strong>Faire dans les parcs</strong>: <span v-for="tax in post.all_lang_taxonomies.activity" :key="tax.name">{{ tax.activity_french[0]  }}</span>
									</div>
									<div v-if="post.pure_taxonomies.activity && lang == 'en'" class="activity-list-container">
										<strong>Do in parks</strong>: <span v-for="tax in post.pure_taxonomies.activity" :key="tax.name">{{ tax.name  }}</span>
									</div>
									<div v-if="post.pure_taxonomies.learn && lang == 'fr'" class="activity-list-container">
										<strong>Savoir les parcs:</strong> <span v-for="tax in post.all_lang_taxonomies.learn" :key="tax.name">{{ tax.learn_french[0] }}</span>
									</div>
									<div v-if="post.pure_taxonomies.learn && lang == 'en'" class="activity-list-container">
										<strong>Know about parks:</strong> <span v-for="tax in post.pure_taxonomies.learn" :key="tax.name">{{ tax.name }}</span>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</paginate>
			<section class="section">
			<div class="column">
				 <div class="column is-4 is-offset-5">
			<paginate-links for="postList" :async="true"></paginate-links>
			</div>
			</div>
			</section>
		</div>
	</section>
</div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main.js';
export default {
	data() {
		return {
			categoryList: [],
			errors: [],
			lang: this.$route.params.lang,
			posts: [],
			paginate: ['postList']
		};
	},
	filters: {
		translatedType(type){
			if (type == 'resource') {
				return 'Ressource'
			} else if ( type == 'research') {
				return 'Recherche'
			} else if ('case-study') {
				return 'Ètude de cas'
			} else {
				return 'Ressource'
			}
		},
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
        filteredList: function (){
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

					let nameArray = [];
					for(let n = 0; n < this.categoryList.length; n++) {
						let name = this.categoryList[n].name
						nameArray.push(name)
					}

					var test = findOne(combined,nameArray)

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
		if (this.lang == 'en') {
			// Check if we have already made calls to get the EN resources
			if(this.$store.state.resourceListEN.length > 0) {
				// If resourceList in the store (an array) has any items, just use the store data
				this.posts = this.$store.state.resourceListEN
				console.log('EN - resourceList exists', this.posts)
			} else {
				// Else, we have no data, so make the calls
				console.log('EN - resourceList does not exists')
				axios.all([
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=100'),
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=100'),
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=100')
				])
				.then(axios.spread((response, response1, response2) => {
					let allENPosts  = response.data.concat(response1.data, response2.data)
					this.posts = allENPosts
					this.$store.commit('SET_RESOURCES_EN', allENPosts)
				}))
				.catch(e => {
					this.errors.push(e)
				})
			}
		} else {
			// Check if we have already made calls to get the FR resources
			if(this.$store.state.resourceListFR.length > 0) {
				// If resourceList in the store (an array) has any items, just use the store data
				this.posts = this.$store.state.resourceListFR
				console.log('FR - resourceList exists', this.posts)
			} else {
				// Else, we have no data, so make the calls
				axios.all([
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=100&lang=fr'),
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=100&lang=fr'),
					axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=100&lang=fr')
				])
				.then(axios.spread((response, response1, response2) => {
					let allFRPosts  = response.data.concat(response1.data, response2.data)
					this.posts = allFRPosts
					for(let j = 0; j < this.posts.length; j++) {
						// if (j != 2 || j != 3 || j != 4) {
						// 	console.log(j, this.posts[j].title.rendered, this.posts[j]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)
						// }
						console.log(j, this.posts[j].title.rendered, this.posts[j])
					}
					this.$store.commit('SET_RESOURCES_FR', allFRPosts)
					console.log('FR - resourceList does not exists', this.posts)
				}))
				.catch(e => {
					this.errors.push(e)
				})
			}
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
	line-height: 1.7rem;
	font-weight: 700;
	margin-bottom: 0.3rem;
	margin-top: 0.3rem;
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

.card .content {
	p {
		margin-bottom: 0.3rem;
	}
}

.activity-list-container,
.activity-list-container span,
.activity-list-container strong {
	font-size: 12px;
	line-height: 1.5;
	color: rgba(0,0,0,0.4) !important;
}

.activity-list-container span {
	display:inline-block;
	margin-right: 5px;
	position: relative;
	&:after {
		content: ',';
		position: absolute;
		bottom: 0;
		right: -2px;
		color: rgba(0,0,0,0.4) !important;
	}
}

.activity-list-container span:last-child {
	margin-right: 0px;
	&:after {
		display: none;
	}
}

</style>