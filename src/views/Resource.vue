<template>
<div v-if="post.meta_box">
	
	<img class="heading" src="/src/assets/placeimg_1000_500_nature.jpg">

	<section style="margin-top: -160px;">
		<div class="columns" >
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white; padding: 3rem;">
				<div class="social-share-container">
					<p>Share via:</p>
					<social-sharing url=""
					title=""
					description=""
					hashtags=""
					twitter-user="Park_People"
					inline-template>
					<div class="social-share-buttons">
						<network network="email">
							<i class="fa fa-envelope"></i> Email
						</network>
						<network network="twitter">
							<i class="fa fa-twitter"></i> Twitter
						</network>
						<network network="facebook">
							<i class="fa fa-facebook"></i> Facebook
						</network>
						<network network="linkedin">
							<i class="fa fa-linkedin"></i> LinkedIn
						</network>
						<!-- <network network="pinterest">
							<i class="fa fa-pinterest"></i> Pinterest
						</network> -->
					</div>
					</social-sharing>
				</div>
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
	
	<section class="section section__single-resource">
		<div class="columns" >
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white;">

				<p v-html="post.content.rendered"></p>

				<ol class="resource__bullets">
					<li v-for="item in post.meta_box._resource_list" :key="item['_resource_list_headline']">
						<h4>{{ item['_resource_list_headline'] }}</h4>
						<p v-html="item['_resource_list_content']"></p>
					</li>
				</ol>

				<h3 class="is-size-4">Takeaways</h3>
				<div v-html="post.meta_box._resource_content_takeaway"></div>
				<h3 class="is-size-4">Tips and Ideas</h3>
				<div>
					<ul>
						<li v-for="tip in post.meta_box._resource_tips" :key="tip['_resource_tip_headline']">
							<h4 v-html="tip['_resource_tip_headline']"></h4>
							<div v-html="tip['_resource_tip_content']"></div>
						</li>
					</ul>
				</div>
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
			id: this.$route.params.id,
			post: [],
			categories: [],
			authorName: '',
		}
	},
	methods: {
		moment: () => {
			return moment();
		}
	},
	created() {
		axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource/' + this.id + '?_embed')

		.then(response => {
			// Let's put data into post
			this.post = response.data
			//console.log(this.post)

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
			const authorID = response.data.author
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

<style lang="scss">

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

ol.resource__bullets {
	list-style: none;
	margin-top: 50px;
	>li {
		counter-increment: item;
		margin-bottom: 5px;
		position: relative;
		padding-left: 70px;
		padding-bottom: 30px;
		margin-bottom: 50px;
		h4 {
			font-size: 24px;
			// line-height: 35px;
			font-weight: bold;
			padding-top: 13px;
		}
	}
	>li:not(:last-child) {
		border-bottom: 2px dashed orange;
	}
	>li:before {
		margin-right: 10px;
		content: counter(item);
		background: white;
		border-radius: 100%;
		border: 2px solid orange;
		color: orange;
		width: 50px;
		height: 50px;
		font-family: serif;
		font-size: 30px;
		font-style: italic;
		font-weight: bold;
		text-align: center;
		padding-top: 9px;
		// display: inline-block;
		position: absolute;
		top: 0;
		left: 0px;
	}
}


</style>