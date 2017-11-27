<template>
<div class="container">
	<h1>Home</h1>
		<ul v-if="posts && posts.length">
			<li v-for="post of posts">
				<p><strong ><router-link :to="'/case-study/' + post.slug">{{ post.title.rendered }}</router-link></strong> (post id: {{ post.id }})
				<br>{{ post.meta_box._listing_address }}
				<br>{{ post.meta_box.geometry2 }}</p>
			</li>
		</ul>

		<ul v-if="errors && errors.length">
			<li v-for="error of errors"> {{ error.message }} </li>
		</ul>
	</div>
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
		    })
		    .catch(e => {
		      	this.errors.push(e)
		    })
		}
	};
</script>

<style lang="sass" scoped>
</style>