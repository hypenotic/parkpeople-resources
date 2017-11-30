<template>
 
	<section class="section">
		<div class="container">
			<transition name="fade">
			<div class="columns is-multiline" v-if="posts && posts.length">
  				<div class="column is-one-quarter" v-for="(post,index) in posts" :key='index'>
    				<div class="card">
  						<div class="card-image">
							<figure class="image is-2by1">
								<img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url">
							</figure>
						</div>
  						<div class="card-content">
							<div class="content">
								<h3><router-link :to="post.type + '/' + post.slug">{{ post.title.rendered }}</router-link></h3>
								
      							
    						</div>
  						</div>
					</div>
  				</div>
			</div>
			</transition>
		</div>
	</section>

</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
	    		posts: [],
	    		errors: [],
			};
		},
	  	created() {
			axios.all([
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/' + '?_embed'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/' + '?_embed'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/' + '?_embed')
			])
			.then(axios.spread((response, response1, response2) => {
				let allPosts  = response.data.concat(response1.data, response2.data);
				//console.log(allPosts)
				this.posts = allPosts
				}
			))
			.catch(e => {
		      	this.errors.push(e)
			})
		}
	};
</script>

<style scoped>

.section {
	background-color: #ecebeb;
}

img {
	object-fit: cover;
}
.card {
	display:flex;
    flex-direction: column;
	height: 100%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
}
</style>