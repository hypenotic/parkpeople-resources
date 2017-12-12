<template>
	<section class="section">
		<div class="columns">
			<div class="column is-8 is-offset-2">
				<div v-if="post.meta_box">

					<h2 class="title" v-if="post.title">{{post.title.rendered}}</h2>
					<p>{{ post.type }} By {{ authorName }} | {{ moment(post.date).format('MMM Do, YYYY') }}</p>
					<ul>
						<li v-for="category in categories">{{ category }}</li>
					</ul>
					<br>
					<p v-html="post.excerpt.rendered"></p>
					<h3 class="is-size-4">Context</h3>
					<span v-html="post.meta_box._resource_content_context"></span>
					<h3 class="is-size-4">Vision</h3>
					<div v-html="post.meta_box._resource_content_vision"></div>
					<h3 class="is-size-4">Approach</h3>
					<div v-html="post.meta_box._resource_content_approach"></div>
					<h3 class="is-size-4">Impact</h3>
					<div v-html="post.meta_box._resource_content_impact"></div>
					<h3 class="is-size-4">Takeaways</h3>
					<div v-html="post.meta_box._resource_content_takeaway"></div>
					<h3 class="is-size-4">Tips and Ideas</h3>
					<div v-html="post.meta_box._resource_tips"></div>
					<h3 class="is-size-4">Quote</h3>
					<div v-html="post.meta_box._resource_content_quote"></div>
					<small v-html="post.meta_box._resource_quote_name"></small>
					<small v-html="post.meta_box._resource_quote_group"></small>
				</div>
				
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
	data() {
		return {
			slug: this.$route.params.slug,
			post: [],
			categories: [],
			authorName: ''
		}
	},
	methods: {
		moment: () => {
			return moment();
		}
	},
	created() {
		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?slug=' + this.slug)
		.then(response => {

			// Let's put data into post
			this.post = response.data[0]

			// Let's get the categories
			const tax1 = this.post.pure_taxonomies.activity
			const tax2 = this.post.pure_taxonomies.learn

			// Let's concat
			const taxAll = tax1.concat(tax2)
			
			// Let's loop, skip over undefined and push
			for(let i = 0; i < taxAll.length; i++) {
				if(typeof(taxAll[i]) != 'undefined') {
					this.categories.push(taxAll[i].name)
				}
			}

			// Let's make another API call to get author data by ID
			const authorID = response.data[0].author
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/users/' + authorID) 
			.then(response => {
				//console.log(response.data)
				this.authorName = response.data.name
			})
			.catch(e => {
				this.errors.push(e)
			})
		})
		.catch(e => {
			this.errors.push(e)
		})
	},
};
</script>

<style lang="scss" scoped>
</style>