<template>
<div v-if="post != null" class="resource-body">
	<div class="heading"></div>
	<section style="margin-top: -200px;">
		<div class="columns">
			<div class="column top-column is-three-fifths is-offset-one-fifth" style="background-color: white;">
				<div class="social-share-container">
					<div id="social-share-trigger" v-bind:class="{ 'social-menu-open': showSocialShare }" v-on:click="showSocialShare = !showSocialShare">
						<i class="fa fa-share-alt" aria-hidden="true"></i>
					</div>
					<social-sharing :url="`https://parkpeople.ca/resources${fullPath}`"
					:title="post.title.rendered"
					description=""
					quote=""
					hashtags="ParkPeople"
					twitter-user="Park_People"
					inline-template>
					<div class="social-share-buttons">
						<network network="email">
							<i class="fa fa-envelope"></i>
						</network>
						<network network="twitter">
							<i class="fa fa-twitter"></i>
						</network>
						<network network="facebook">
							<i class="fa fa-facebook"></i>
						</network>
						<network network="linkedin">
							<i class="fa fa-linkedin"></i>
						</network>
					</div>
					</social-sharing>
				</div>
				<h1 v-html="post.title.rendered"></h1>
				
				<div v-if="this.$route.params.lang == 'en'" class="category-lists">
					<div v-if="post.pure_taxonomies.hasOwnProperty('activity')">
						<span v-if="this.$route.params.lang == 'fr'">Faire dans les parcs:</span>
						<span v-else>Do in parks:</span>
						<ul>
							<!-- <li v-if="this.$route.params.lang == 'fr'" v-for="category in post.all_lang_taxonomies.activity" :key="category.name">{{ category.activity_french[0] }} </li> -->
							<li v-for="category in post.pure_taxonomies.activity" :key="category.name">{{ category.name }} </li>
						</ul>
					</div>
					<div v-if="post.pure_taxonomies.hasOwnProperty('learn')">
						<span v-if="this.$route.params.lang == 'fr'">Savoir les parcs:</span>
						<span v-else>Know about parks:</span>
						<ul>
							<!-- <li v-if="this.$route.params.lang == 'fr'" v-for="category in post.all_lang_taxonomies.learn" :key="category.name">{{ category.learn_french[0] }}</li> -->
							<li v-for="category in post.pure_taxonomies.learn" :key="category.name">{{ category.name }}</li>
						</ul>
					</div>
				</div>

				<p v-if="this.$route.params.lang == 'en'" class="meta"><span class="capitalize">{{ post.type }}</span> | {{ moment(post.date).format('MMM, YYYY') }}</p>
				<p v-else class="meta"><span class="capitalize">Ressource</span> | {{ moment(post.date).format('MMM, YYYY') }}</p>

				<div class="resource__excerpt" v-html="post.excerpt.rendered" style="margin: 0;"></div>
			</div>
		</div>
	</section>
	
	<img v-if="post._embedded.hasOwnProperty('wp:featuredmedia')" style="width: 100%; object-fit: cover; height: 500px; object-position: 0 30%;" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url">
	
	<section class="section section__single-resource">
		<div class="columns" >
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white;">

				<div v-html="post.content.rendered" class="resource__content__copy"></div>

				<ol class="resource__bullets">
					<li v-for="item in post.meta_box._resource_list" :key="item['_resource_list_headline']">
						<h2 class="resource__bullets__header">{{ item['_resource_list_headline'] }}</h2>
						<div class="resource__bullets__content" v-html="item['_resource_list_content']"></div>
					</li>
				</ol>

				<div v-if="post.meta_box._resource_content_takeaway != ''" class="resource__takeaways">
					<h3 v-if="lang=='fr'">Résumé</h3>
					<h3 v-else>Takeaways</h3>
					<div v-html="post.meta_box._resource_content_takeaway" class="resource__takeaways__content"></div>
				</div>

				<div v-if="post.meta_box._resource_tips > 0" class="resource__tips">
					<h3 v-if="lang=='fr'">Conseils et idées</h3>
					<h3 v-else>Tips &amp; Bonus Ideas</h3>
					<div>
						<ul class="resource__tips__bullets">
							<li v-for="tip in post.meta_box._resource_tips" :key="tip['_resource_tip_headline']">
								<h4 v-html="tip['_resource_tip_headline']"></h4>
								<div v-html="tip['_resource_tip_content']"></div>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</div>

		<div class="quote" v-if="post.meta_box._resource_quotation_body != undefined && post.meta_box._resource_quotation_body != ''">
			<blockquote class="full-width-quote" v-html="post.meta_box._resource_quotation_body"></blockquote>
			<cite>
				<small v-html="post.meta_box._resource_quotation_name"></small>
				<small v-html="post.meta_box._resource_quotation_group"></small>
			</cite>
		</div>

		<app-rec-links class="rec-link" v-if="post.meta_box.hasOwnProperty('_resource_links') && post.meta_box._resource_links.length > 0" :rec-links="post.meta_box._resource_links">
		</app-rec-links>

	</section>
	
	<app-related v-if="relatedPosts.length > 0" :related-resources="relatedPosts.slice(0, 4)"></app-related>
	
</div>
</template>

<script>
import axios 		from 'axios';
import moment 		from 'moment';
import { mapState } from 'vuex';
import RelatedPosts from '../components/RelatedPosts.vue';
import RecLinks 	from '../components/RecLinks.vue';
export default {
	components: {
		appRelated: RelatedPosts,
		appRecLinks: RecLinks
    },
	data() {
		return {
			authorName: '',
			categories: [],
			categoryIDs: [],
			errors: [],
			fullPath: this.$route.fullPath,
			grantResource: false,
			id: this.$route.params.id,
			lang: this.$route.params.lang,
			post: null,
			relatedPosts: [],
			showSocialShare: false,
			slug: this.$route.params.slug,
			translated: false,
			translatedPost: []
		}
	},
	filters: {
		translatedType(type){
			if (type == 'resource') {
				return 'ressource'
			} else if ( type == 'research') {
				return 'recherche'
			} else {
				return 'étude de cas'
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
			if (value.length < length) {
				return value;
			} else {	
				return value.substring(0, length) + suffix;
			}
		},
		stripHTML(value) {
			return value.replace(/(<([^>]+)>)/ig,"");
		},
		toTitleCase(value)
			{
    		return value.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	},
	methods: {
		moment: () => {
			return moment();
		},
		relatedClick() {
			console.log('relatedclick');
			this.$ga.event('category', 'action', 'label', 123)
		}
	},
	created() {
		// Reset store check values
		this.$store.commit('SET_TRANSLATION_CHECK', false)

		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/' + this.id + '?_embed')

		.then(response => {
			// Let's put data into post
			this.post = response.data
			console.log('THIS IS THE RESOURCE', this.post)
			
			// Let's get the categories
			const tax1 = this.post.pure_taxonomies.activity
			const tax2 = this.post.pure_taxonomies.learn

			// Let's concat
			let taxAll = [];
			// const taxAll = tax1.concat(tax2)
			if(typeof(tax1) != 'undefined'){
				taxAll = tax1.concat(tax2)
			} else if(typeof(tax2) != 'undefined') {
				taxAll = tax2.concat(tax1)
			} else {
				return
			}
			
			// Let's loop, skip over undefined and push
			for(let i = 0; i < taxAll.length; i++) {
				if(typeof(taxAll[i]) != 'undefined') {
					this.categories.push(taxAll[i].name)
				}
			}

			// Let's see if there's a translation
			if (this.post.wpml_translations.length > 0) {
				console.log('translation post', this.post)
				console.log('translation exists', this.post.wpml_translations)
				let translatedID = this.post.wpml_translations[0].id
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/' + translatedID + '?_embed') 
				.then(response => {
					console.log(response.data)
					this.translatedPost = response.data
					this.translated = true;
					let langTag = ''
					let transURL = ''
					if (this.$route.params.lang == 'en') {
						langTag = 'fr'
						transURL = '/'+langTag+'/'+response.data.type+'/'+response.data.id+'/'+response.data.slug;
					} else {
						langTag = 'en'
						transURL = '/'+langTag+'/'+response.data.type+'/'+response.data.id+'/'+response.data.slug;
					}
					this.$store.commit('SET_TRANSLATION_CHECK', true)
					this.$store.commit('SET_TRANSLATION_URL', transURL)
					console.log(this.$store.state.translatedCheck)
				})
				.catch(error => {
					if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log('Translated Post Call', error.response.data);
					console.log('Translated Post Call', error.response.status);
					console.log('Translated Post Call', error.response.headers);
					} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log('Translated Post Call', error.request);
					} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error Translated Post Call', error.message);
					}
					console.log('Translated Post Call', error.config);
				})
			} else {
				console.log('no translation')
			}

			// Let's get the categories IDs
			let taxID1 = this.post.activity
			let taxID2 = this.post.learn

			let stringID1 = "0"
			if (taxID1.length > 0) {
				stringID1 = taxID1.join(',')
			}

			let stringID2 = "0"
			if (taxID2.length > 0) {
				stringID2 = taxID2.join(',')
			}
			
			console.log(stringID1, stringID2)
			
			let langString = ''
			if (this.lang == 'en'){
				langString = ''
			} else {
				langString = '&lang=fr'
			}

			// Let's make a call to get related posts
			axios.all([
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=4&activity='+stringID1+langString),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=4&activity='+stringID1+langString),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=4&activity='+stringID1+langString),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?_embed&per_page=4&learn='+stringID2+langString),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&per_page=4&learn='+stringID2+langString),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&per_page=4&learn='+stringID2+langString)
			])
			.then(axios.spread((response, response1, response2, response3, response4, response5) => {
				
				function removeDuplicates(myArr, prop) {
					return myArr.filter((obj, pos, arr) => {
						return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
					});
				}

				let allPosts  = response.data.concat(response1.data, response2.data, response3.data, response4.data, response5.data)

				console.log('all posts', allPosts)

				let noDups = removeDuplicates(allPosts, 'id')

				noDups.sort(function(a,b){
					return new Date(b.date) - new Date(a.date)
				})	
				
				this.relatedPosts = noDups

			}))
			.catch(error => {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('219', error.response.data);
				console.log('219', error.response.status);
				console.log('219', error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('219', error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error 219', error.message);
				}
				console.log('219', error.config);
			})


			// Let's make another API call to get author data by ID
			const authorID = response.data.author
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/users/' + authorID) 
			.then(response => {
				//console.log(response.data)
				this.authorName = response.data.name
			})
			.catch(error => {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('246', error.response.data);
				console.log('246', error.response.status);
				console.log('246', error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('246', error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error 246', error.message);
				}
				console.log('246', error.config);
			})
		})
		.catch(error => {
			if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log('265', error.response.data);
			console.log('265', error.response.status);
			console.log('265', error.response.headers);
			} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log('265', error.request);
			} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error 265', error.message);
			}
			console.log('265', error.config);
		})
	},
};
</script>

<style lang="scss">

@import '../styles/variables.scss';

.column {
	@media #{$small-and-down} {
        padding: 16px;
    }
}

.column.top-column {
	padding: 72px 72px 0;
	position: relative;
	margin-bottom: 30px;
	@media #{$small-and-down} {
        padding: 72px 50px;
    }
}

h1 {
	color: $off-black;
	font-size: 2.5rem;
	line-height: 1.3;
	margin-bottom: 24px;
	font-weight: bold;
}

div.heading {
	position: relative;
	z-index: -1;
	margin-top: -60px;
	height: 300px;
	width: 100%;
	// object-fit:cover;
  	// object-position: 0 20%;
	-webkit-clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
	clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
	background-color: #fff3ed;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='%23ff7834' fill-opacity='0.22'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.type {
	background-color: green;
	color: white;
	padding: 7px 7px 5px 7px;
	font-weight: 700;
	margin-right: 10px;
	text-transform: uppercase;
}

.section__single-resource,
.related-resources {
	h3 {
		color: $green;
		font-size: 40px;
	}
}

ul.category {
	list-style-type: none;
	margin: 0 0 1.5rem 0;
	li { 
		color: rgba(0,0,0,0.5);
		display: inline;
		text-transform: uppercase;
		font-weight: 700;
		&:not(:last-child):after {
			content: " / ";
		}
	}
}

ol.resource__bullets,
ul.resource__tips__bullets {
	list-style: none;
	margin-top: 50px;
	>li {
		counter-increment: item;
		margin-bottom: 5px;
		position: relative;
		padding-left: 70px;
		padding-bottom: 30px;
		margin-bottom: 50px;
		h2 {
			
		}
		h4 {
			// font-size: 24px;
			// // line-height: 35px;
			// font-weight: bold;
			// padding-top: 13px;
		}
	}
	>li:not(:last-child) {
		border-bottom: 2px dashed $orange;
	}
	>li:before {
		margin-right: 10px;
		content: counter(item);
		background: white;
		border-radius: 100%;
		border: 2px solid $orange;
		color: $orange;
		width: 50px;
		height: 50px;
		font-family: serif;
		font-size: 30px;
		font-style: italic;
		font-weight: bold;
		text-align: center;
		padding-top: 9px;
		// display: inline-block;
		position: absolute;
		top: 0;
		left: 0px;
	}
}

.card-image img {
	object-fit: cover;
}

ul.resource__tips__bullets {
	margin-top: 0;
}

.social-share-container {
	position: absolute;
	top: 24px;
	right: 24px;
}

#social-share-trigger {
	width: 40px;
	height: 40px;
	border-radius: 100%;
	background: $main-accent;
	&:hover {
		cursor: pointer;
	}
	i {
		padding-top: 8px;
		padding-left: 8px;
		color: $white;
		font-size: 24px;
		font-weight: 300;
	}
}

.social-share-buttons {
	// display: none;
	position: absolute;
	opacity: 0;
	// top: -100vh;
	transition: all 0.5 ease;
	span {
		position: absolute;
		display: block;
		opacity: 0;
		width: 35px;
		height: 35px;
		border-radius: 100%;
		transition: all 0.5 ease;
		top: 0;
		left: 0;
		&:hover {
			cursor: pointer;
		}
		i {
			color: $white;
			padding-left: 10px;
			padding-top: 8px;
		}
	}
	
}

#social-share-trigger.social-menu-open {
	opacity: 1;
}

#social-share-trigger.social-menu-open + .social-share-buttons {
	// display: block;
	top: 0;
	left: 50px;
	opacity: 1;
	span {
		opacity: 1;
	}
	span:first-child {
		background: orange;
		top: -40px;
		left: -10px;
	}
	span:nth-child(2) {
		background: $blue;
		top: 0px;
		left: 20px;
	}
	span:nth-child(3) {
		background: darken($blue, 30);
		top: 50px;
		left: 10px;
	}
	span:last-child {
		background: darken($blue, 10);
		top: 70px;
		left: -40px;
	}
}

.resource__takeaways,
.resource__tips {
	padding: 32px 0;
}



.button.button--ghost.button--orange {
	border: 2px solid $orange;
	border-radius: 50px;
	padding: 1.2rem 1rem;
	color: $orange;
	font-size: 0.8rem;
	font-weight: bold;
	&:hover {
		border: 2px solid $orange;
		background: $orange;
		color: $white;
	}
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
				content: " | ";
			}
		}
	}

	.card__activity-list,
	.card__learn-list {
		li {
			font-family: $family-sanserif;
			// color: $blue;
		}
	}
}

.resource__bullets__header {
	font-size: 1.5rem;
	line-height: 1.2;
	font-weight: bold;
	padding-top: 0.5rem;
}

.resource__bullets__content,
.resource__takeaways__content,
.resource__content__copy {
	h1,h2,h3,h4,h5,h6 {
		color: $off-black;
		font-weight: bold !important;
		font-family: $family-sanserif;
	}
	h1 {
		font-size: 2.8rem;
		line-height:1.5;
		margin-bottom: 1rem;
	}
	h2 {
		font-size: 2.4rem;
		line-height:1.5;
	}
	h3 {
		font-size: 2rem;
		line-height:1.5;
	}
	h4 {
		font-size: 1.3rem !important;
		line-height:1.5 !important;
		padding-top: 0 !important;
	}
	h5 {
		font-size: 1.2rem;
		line-height:1.5;
	}
	h6 {
		font-size: 1.1rem;
		line-height:1.5;
	}
	blockquote {
		padding: 0 40px 24px;
		font-family: "Merriweather", serif;
		color: $green;
		font-size: 1.1rem;
		line-height: 1.2;
		font-style: italic;
	}
}

.category-lists {
	margin-bottom: 24px;
	font-family: $family-sanserif;
	font-weight: bold;
	ul {
		display: inline-block;
		li {
			display: inline-block;
			color: rgba(0, 0, 0, 0.5);
			text-transform: uppercase;
			margin: 0 8px;
		}
	}
}

.meta {
	font-size: 0.8rem;
}

.capitalize {
	text-transform: capitalize;
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