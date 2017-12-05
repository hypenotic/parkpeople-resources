<template>
	<section class="section">
		<div class="columns">
			<div class="column is-8 is-offset-2">
				<div v-if="posts.meta_box">
					<h2 class="title" v-if="posts.title">{{posts.title.rendered}}</h2>
					<h3 class="is-size-4">Context</h3>
					<span v-html="posts.meta_box._resource_content_context"></span>
					<h3 class="is-size-4">Vision</h3>
					<div v-html="posts.meta_box._resource_content_vision"></div>
					<h3 class="is-size-4">Approach</h3>
					<div v-html="posts.meta_box._resource_content_approach"></div>
					<h3 class="is-size-4">Impact</h3>
					<div v-html="posts.meta_box._resource_content_impact"></div>
					<h3 class="is-size-4">Takeaways</h3>
					<div v-html="posts.meta_box._resource_content_takeaway"></div>
					<h3 class="is-size-4">Tips and Ideas</h3>
					<div v-html="posts.meta_box._resource_tips"></div>
					<h3 class="is-size-4">Quote</h3>
					<div v-html="posts.meta_box._resource_content_quote"></div>
					<small v-html="posts.meta_box._resource_quote_name"></small>
					<small v-html="posts.meta_box._resource_quote_group"></small>
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
				slug: this.$route.params.slug,
				posts: [],
			}
		},
		created() {
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?slug=' + this.slug)
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

<style lang="scss" scoped>
</style>