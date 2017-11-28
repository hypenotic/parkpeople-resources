<template>
	<section class="section">
		<div class="container">
			<div class="columns is-multiline" v-if="posts && posts.length">
  				<div class="column is-one-quarter" v-for="(post,index) in posts" :key='index'>
    				<div class="card">
  						<div class="card-image">
							<figure class="image is-4by3">
								<img src="https://picsum.photos/400/300/?random">
							</figure>
						</div>
  						<div class="card-content">
							<div class="content">
								<h3><router-link :to="post.type + '/' + post.slug">{{ post.title.rendered }}</router-link></h3>
								<span v-html="post.excerpt.rendered"></span>
      							<time datetime="2016-1-1">{{ post.modified }}</time>
								<br><small>(id: {{ post.id }})</small>
    						</div>
  						</div>
					</div>
  				</div>
			</div>
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
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/'),
				axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/')
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
.card {
	display:flex;
    flex-direction: column;
	height: 100%;
}
</style>