<template>
<div v-if="post != null" class="resource-body">

	<div class="heading"></div>

	<section style="margin-top: -160px;">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white; padding: 3rem;position:relative;">
				<div class="social-share-container">
					<div id="social-share-trigger" v-bind:class="{ 'social-menu-open': showSocialShare }" v-on:click="showSocialShare = !showSocialShare">
						<i class="fa fa-share-alt" aria-hidden="true"></i>
					</div>
					<social-sharing :url="`https://parkpeople.ca/resources${fullPath}`"
					:title="post.title.rendered"
					description=""
					quote=""
					hashtags=""
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

				<h1 v-html="post.title.rendered" class="title"></h1>

				<div class="columns" style="margin-top: 32px;">
					<div class="column is-6">
						<div v-if="post.meta_box._research_link_title != ''" class="research__thumbnail">
							<img :src="post.meta_box._research_link_thumbnail[0].full_url" :alt="post.meta_box._research_link_title">   
						</div>
						<div v-else class="research__thumbnail research__thumbnail--pdf">
							<div>
								<p v-html="post.meta_box._research_pdf_title"></p>
								<p class="pdf_pages" v-if="post.meta_box.hasOwnProperty('_research_pdf_pages') && post.meta_box._research_pdf_pages != ''"><span v-html="post.meta_box._research_pdf_pages"></span>	pages</p>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g transform="translate(-71.09-24.1)"><path d="m68.52 1026.73c-.309-.304-.995-.466-2.038-.479-.706-.011-1.556.054-2.45.179-.4-.231-.813-.482-1.137-.785-.871-.813-1.598-1.943-2.051-3.184.03-.116.055-.218.078-.322 0 0 .491-2.787.361-3.729-.018-.129-.029-.167-.064-.267l-.043-.109c-.133-.308-.395-.634-.805-.616l-.241-.011h-.007c-.458 0-.83.234-.928.584-.298 1.097.009 2.738.566 4.863l-.142.346c-.398.971-.898 1.949-1.338 2.812l-.057.112c-.463.907-.884 1.677-1.265 2.329l-.394.208c-.029.015-.703.372-.861.467-1.342.801-2.231 1.711-2.379 2.433-.047.23-.012.525.227.662l.381.191c.165.083.339.125.518.125.956 0 2.066-1.191 3.594-3.859 1.765-.575 3.774-1.052 5.536-1.316 1.342.756 2.993 1.281 4.03 1.281.185 0 .344-.018.474-.052.2-.053.368-.167.471-.321.202-.304.243-.723.188-1.152-.016-.127-.118-.285-.228-.392zm-14.277 5.086c.174-.477.864-1.419 1.884-2.255.064-.052.222-.2.367-.338-1.067 1.701-1.781 2.38-2.251 2.592m6.04-13.914c.307 0 .482.775.497 1.501.014.726-.155 1.236-.366 1.613-.174-.558-.259-1.438-.259-2.01 0 0-.013-1.1.128-1.1m-1.802 9.916c.214-.383.437-.787.664-1.216.555-1.049.905-1.87 1.166-2.544.519.944 1.165 1.747 1.925 2.39.095.08.195.161.301.241-1.545.306-2.88.677-4.056 1.129m9.74-.086c-.094.058-.364.093-.537.093-.56 0-1.252-.256-2.222-.672.373-.028.715-.042 1.021-.042.561 0 .727 0 1.276.138.549.14.556.424.462.483" transform="matrix(.79299 0 0 .79299 30.686-780.68)" fill="#d4d4d4"/></g></svg>
							</div>
						</div>
					</div>
					<div class="column is-6">
						<div v-if="post.meta_box._research_link_title != ''">
							<h6 v-html="post.meta_box._research_link_title"></h6>
							<p><span v-html="post.meta_box._research_link_subtitle"></span> | <span v-if="post.meta_box.hasOwnProperty('_research_link_date') && post.meta_box._research_link_date != ''" v-html="post.meta_box._research_link_date"></span> </p>
							<div class="research__excerpt" v-html="post.excerpt.rendered" style="margin: 0;"></div>
							<a v-if="lang == 'fr'" :href="post.meta_box._research_link_button" class="button button--rounded button--orange" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i>Lis</a>
							<a v-else :href="post.meta_box._research_link_button" class="button button--rounded button--orange" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> Read</a>
						</div>
						<div v-else>
							<h6 v-html="post.meta_box._research_pdf_title"></h6>
							<p><span v-html="post.meta_box._research_pdf_subtitle"></span> | <span v-if="post.meta_box.hasOwnProperty('_research_pdf_date') && post.meta_box._research_pdf_date != ''" v-html="post.meta_box._research_pdf_date"></span> </p>
							<div class="research__excerpt" v-html="post.excerpt.rendered" style="margin: 0;"></div>
							<a v-if="lang == 'fr'" :href="post.meta_box._research_pdf_file[0].url" class="button button--rounded button--orange" target="_blank"><i class="fa fa-download" aria-hidden="true"></i>Cliquez pour télécharger</a>
							<a v-else :href="post.meta_box._research_pdf_file[0].url" class="button button--rounded button--orange" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> Click to download</a>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="quote" v-if="post.meta_box._research_content_quote != undefined && post.meta_box._research_content_quote != ''">
		<blockquote class="full-width-quote" v-html="post.meta_box._research_content_quote"></blockquote>
		<cite>
			<small v-html="post.meta_box._research_quote_name"></small>
			<small v-html="post.meta_box._research_quote_group"></small>
		</cite>
	</div>

	<section class="section research__summary" v-if="post.content.rendered != ''">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
					<h3 v-if="lang=='fr'" class="is-size-4">Résumé</h3>
					<h3 v-else class="is-size-4">Summary</h3>
					<div v-html="post.content.rendered"></div>
				</div>
			</div>
	</section>

	<app-rec-links class="rec-link" v-if="post.meta_box.hasOwnProperty('_research_links') && post.meta_box._research_links.length > 0" :recLinks="post.meta_box._research_links">
	</app-rec-links>

	<div v-if="post.pure_taxonomies.activity && lang=='fr'" class="research__activity-list">
		<b>Faire dans les parcs: </b>
		<ul>
			<li v-for="tax in post.all_lang_taxonomies.activity" :key="tax.name">{{ tax.activity_french[0] | toUppercase }}</li>
		</ul>
	</div>
	<div v-if="post.pure_taxonomies.learn && lang=='fr'"  class="research__learn-list">
		<b>Savoir les parcs: </b>
		<ul>
			<li v-for="tax in post.all_lang_taxonomies.learn" :key="tax.name">{{ tax.learn_french[0] | toUppercase }}</li>
		</ul>
	</div>
	<div v-if="post.pure_taxonomies.activity && lang=='en'" class="research__activity-list">
		<b>Do in parks: </b>
		<ul>
			<li v-for="tax in post.pure_taxonomies.activity" :key="tax.name">{{ tax.name | toUppercase }}</li>
		</ul>
	</div>
	<div v-if="post.pure_taxonomies.learn && lang=='en'"  class="research__learn-list">
		<b>Know about parks: </b>
		<ul>
			<li v-for="tax in post.pure_taxonomies.learn" :key="tax.name">{{ tax.name | toUppercase }}</li>
		</ul>
	</div>

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
		methods: {
			moment: () => {
				return moment();
			},
			formatDate(theDate){
				var dateTime = moment(theDate);
				var ss = dateTime.format("MMM DD, YYYY");
				return ss.toString();
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
		created() {
			// Reset store check values
			this.$store.commit('SET_TRANSLATION_CHECK', false)

			axios.get('https://parkpeople.ca/wp-json/wp/v2/research/' + this.id + '?_embed')

			.then(response => {
				// Let's put data into post
				this.post = response.data
				console.log('THIS IS THE RESEARCH', this.post)

				// Let's get the categories
				const tax1 = this.post.pure_taxonomies.activity
				const tax2 = this.post.pure_taxonomies.learn

				// Let's concat
				let taxAll = [];
				if(typeof(tax1) != 'undefined'){
					taxAll = tax1.concat(tax2);
				} else if(typeof(tax2) != 'undefined') {
					taxAll = tax2.concat(tax1);
				} else {
					return;
				}
				
				// Let's loop, skip over undefined and push
				for(let i = 0; i < taxAll.length; i++) {
					if(typeof(taxAll[i]) != 'undefined') {
						this.categories.push(taxAll[i].name)
					}
				}

				// Let's see if there's a translation
				if (this.post.wpml_translations.length >0) {
					console.log('translation post', this.post)
					console.log('translation exists', this.post.wpml_translations)
					let translatedID = this.post.wpml_translations[0].id
					axios.get('https://parkpeople.ca/wp-json/wp/v2/research/' + translatedID + '?_embed') 
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
						console.log(transURL);
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
					axios.get('https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&activity='+stringID1+langString),
					axios.get('https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&activity='+stringID1+langString),
					axios.get('https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&activity='+stringID1+langString),
					axios.get('https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&learn='+stringID2+langString),
					axios.get('https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&learn='+stringID2+langString),
					axios.get('https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&learn='+stringID2+langString)
				])
				.then(axios.spread((response, response1, response2, response3, response4, response5) => {
					
					function removeDuplicates(myArr, prop) {
						return myArr.filter((obj, pos, arr) => {
							return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
						});
					}

					let allPosts  = response.data.concat(response1.data, response2.data, response3.data, response4.data, response5.data)

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
				axios.get('https://parkpeople.ca/wp-json/wp/v2/users/' + authorID) 
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

<style lang="scss" scoped>

div.heading {
	position: relative;
	z-index: -1;
	margin-top: -60px;
	height: 300px;
	width: 100%;
	object-fit:cover;
  	object-position: 0 20%;
	-webkit-clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
	clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
	clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
	background-color: #fff3ed;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='%23ff7834' fill-opacity='0.22'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@import '../styles/variables.scss';

.research__excerpt {
	font-size: 0.8rem;
	line-height: 1.5;
	p {
		font-size: 0.8rem;
	line-height: 1.5;
	}
}

.content a h4 {
	color: rgba(30,177,242, 1);
	font-size: 1.2rem;
	line-height: 1.8rem;
	font-weight: 700;

	&:hover {
		color: rgba(30,177,242,0.7);
	}
}

h1 {
	color: $off-black;
	font-size: 2.5rem;
	line-height: 1.3;
	margin-bottom: 24px;
	font-weight: bold;
}

img.heading {
	position: relative;
	z-index: -1;
	margin-top: -60px;
	height: 300px;
	width: 100%;
	object-fit:cover;
  	object-position: 0 20%;
	-webkit-clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
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


.rec-link {
	margin-bottom: 50px;
	.rec-link__excerpt {
		font-size: 0.8rem;
	}
	.rec-link__meta {
		margin-bottom: 8px;
	}
}

.resource__rec-link__list {
	@media #{$large-and-up} {
        display: flex;
		justify-content: center;
		>li {
			width: 30%;
			margin: 0 1%;
		}
	}
	h4 {
		font-size: 32px;
		font-weight: bold;
	}
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


.card-image img {
	object-fit: cover;
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

.button.button--ghost.button--orange {
	border: 2px solid $orange;
	border-radius: 50px;
	padding: 1.2rem 1rem;
	color: $orange;
	font-size: 0.8rem;
	font-weight: bold;
}

.button.button--rounded.button--orange {
	border: 2px solid $orange;
	border-radius: 50px;
	padding: 1.2rem 1rem;
	color: $white;
	background: $orange;
	font-size: 0.8rem;
	font-weight: bold;
	&:hover {
		background: darken($orange,5);
		border: 2px solid darken($orange,5)
	}
	i {
		color: $white;
		margin-right: 5px;
	}
}

.research__summary {
	h3 {
		font-weight: bold;
	}
	div {
		font-size: 1.2rem;
		line-height: 1.8rem;
	}
}

.research__thumbnail {
	img {
		max-width: 90%;
		height: auto;
	}
}

.research__thumbnail.research__thumbnail--pdf {
	>div {
		text-align: center;
		width: 90%;
		height: 350px;
		background: rgb(249, 249, 249);
		position: relative;
		border-bottom: 3px solid lightgrey;
		&:after {
			content:"";
			position: absolute;
			bottom: -12px;
			left: 0;
			margin-right: 2.5%;
			margin-left: 2.5%;
			background: rgb(249, 249, 249);
			height: 9px;
			width: 95%;
			border-bottom: 3px solid lightgrey;
		}
		p {
			padding-top: 35%;
			font-weight: bold;
		}
		.pdf_pages {
			position: absolute;
			bottom: 16px;
			font-size: 0.7rem;
			width: 100%;
			text-align: center;
			margin: 0;
			opacity: 0.5;
		}
		svg {
			width: 50px;
			height: 50px;
			position: absolute;
			top: 8px;
			right: 8px;
		}
	}
}

.research__learn-list {
	margin-top: 50px;
}

.research__activity-list,
.research__learn-list {
	text-align: center;
	font-family: $family-sanserif;
	font-weight: bold;
	ul {
		display: inline-block;

	}
	li, b {
		font-family: $family-sanserif;
	}
	li {
		display: inline-block;
		text-transform: uppercase;
		margin: 0 5px;
		position: relative;
		&:not(:last-child):after {
			content: ',';
			position: absolute;
			bottom: 0;
			right: -4px;
			color: rgba(0,0,0,0.7) !important;
		}
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

.card {
	border-radius: 8px;
	background: $white;
	transition: all .2s ease-in-out; 
	&:hover {
		transform: scale(1.01) rotate(1deg);
		// -webkit-box-shadow: 0 4px 6px -6px #222;
		// -moz-box-shadow: 0 4px 6px -6px #222;
		box-shadow: 0 5px 10px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);
		h4 {
			color: rgba(30, 177, 242, 0.7);
		}
	}
	.card-image, .card-image figure img  {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
}


.single-card:first-child {
	transform: rotate(-2deg);
}

.single-card:nth-child(7n) {
	transform: rotate(-2deg);
}

.single-card:nth-child(3n) {
	transform: rotate(2deg);
}

.related-card {
	display: block;
	background: $white;
	.card {
		display: block;
	}
}




</style>