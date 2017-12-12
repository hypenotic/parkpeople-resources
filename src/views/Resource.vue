<template>
<div v-if="post.meta_box">
	
	<img class="heading" src="/src/assets/placeimg_1000_500_nature.jpg">

	<section style="margin-top: -160px;">
		<div class="columns" >
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white; padding: 3rem;">
				<h2 v-html="post.title.rendered" class="title"></h2>
				<p><span class="type">{{ post.type }}</span> By {{ authorName }} |  {{ moment(post.date).format('MMM Do, YYYY') }}</p>
				<ul class="category">
					<li v-for="category in categories">{{ category }}</li>
				</ul>
				<p v-html="post.excerpt.rendered"></p>
			</div>
		</div>
	</section>

	<img style="width: 100%; object-fit: cover; height: 300px; object-position: 0 30%;" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url">
	
	<section class="section">
		<div class="columns" >
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white;">

				<p v-html="post.content.rendered"></p>

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
	</section>
</div>
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
		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/?_embed&slug=' + this.slug)
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

ul.category {
	list-style-type: none;
	margin: 0 0 1.5rem 0;
	li { 
		color: rgba(0,0,0,0.5);
		display: inline;
		text-transform: uppercase;
		font-weight: 700;
		&:not(:last-child):after {
			content: " / ";
		}
	}
}

</style>