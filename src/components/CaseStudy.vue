<template>
<div class="container">
	<h3 v-if="posts.title">{{posts.title.rendered}}</h3>
	<div v-for="post in posts">
						{{ post }}
					</div>
</div>
</template>

<script>
import axios from 'axios';
	export default {
		data() {
			return {
				//slug: this.$route.params.slug,
				posts: [],
			}
		},
		created() {
			//wp-json/wp/v2/YOUR_CUSTOM_POST_TYPE/?slug=hotelica
			//axios.get('http://hypelabs.ca/dev/pp-map/wp-json/wp/v2/listing/?slug=' + this.slug)
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/443')
		    .then(response => {
		    	// JSON responses are automatically parsed.
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