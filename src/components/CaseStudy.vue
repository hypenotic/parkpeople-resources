<template>
	<section class="section">
		<div class="container">
			<div v-if="posts.meta_box">
				<h2 class="title" v-if="posts.title">{{posts.title.rendered}}</h2>
				<h3 class="is-size-4">Context</h3>
				<div v-html="posts.meta_box._casestudy_content_context"></div>
				<h3 class="is-size-4">Vision</h3>
				<div v-html="posts.meta_box._casestudy_content_vision"></div>
				<h3 class="is-size-4">Approach</h3>
				<div v-html="posts.meta_box._casestudy_content_approach"></div>
			</div>
		</div>
	</section>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				slug: this.$route.params.slug,
				posts: [],
			}
		},
		created() {
			//wp-json/wp/v2/YOUR_CUSTOM_POST_TYPE/?slug=hotelica
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study/?slug=' + this.slug)
		    .then(response => {
				this.posts = response.data[0]
				console.log(response.data[0])
		    })
		    .catch(e => {
		      	this.errors.push(e)
		    })
		}
	};
</script>

<style lang="sass" scoped>
</style>