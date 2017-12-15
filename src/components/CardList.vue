<template>
<div>
	<section class="section">
		<div class="container">
			
			<p>Counter is: {{ doubleCounter }}</p>
			<p>Number of clicks: {{ stringCounter }}</p>

			<transition name="fade">
			<div class="columns is-multiline" v-if="posts && posts.length">
  				<div class="column is-one-quarter" v-for="(post,index) in posts" :key='index'>
    				<div class="card" :data-category="getDataAtt()">
  						<div class="card-image">
							<figure class="image is-2by1">
								<img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
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
			</transition>
		</div>
	</section>
	<div class="skewed-bg"></div>
</div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			posts: [],
			errors: [],
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
	computed: {
		...mapGetters([
			'doubleCounter', 
			'stringCounter'])
	},
	methods: {
		getDataAtt() {
			for(let i = 0; i < this.posts.length; i++) {
				return this.posts[i].pure_taxonomies.activity[i].name
				//return console.log(i)
			}
			
		}
	},
	created() {
		axios.all([
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/' + '?_embed'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/' + '?_embed'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/' + '?_embed')
		])
		.then(axios.spread((response, response1, response2) => {
			let allPosts  = response.data.concat(response1.data, response2.data);
			console.log(allPosts)
			this.posts = allPosts
			
		}))
		.catch(e => {
			this.errors.push(e)
		})
	}
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