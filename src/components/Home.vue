<template>
	<section class="section">
		<div class="container">
			<div class="columns is-multiline" v-if="posts && posts.length">
  				<div class="column is-one-quarter" v-for="(post,index) in posts" :key='index'>
    				<div class="card">
  						<div class="card-image">
							<figure class="image is-4by3">
								<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
							</figure>
						</div>
  						<div class="card-content">
							<div class="content">
								<h3><router-link :to="'/case-study/' + post.slug">{{ post.title.rendered }}</router-link></h3>
								<p v-html="post.excerpt.rendered"></p>
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
		// Fetches posts when the component is created.
	  	created() {
		    axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/')
		    .then(response => {
				  this.posts = response.data
				  console.log(response.data)
		    })
		    .catch(e => {
		      	this.errors.push(e)
		    })
		}
	};
</script>

<style lang="sass" scoped>

</style>