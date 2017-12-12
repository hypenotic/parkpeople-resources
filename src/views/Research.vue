<template>
<div v-if="post.meta_box">

	<img class="heading" src="/src/assets/placeimg_1000_500_nature2.jpg">

	<section style="margin-top: -160px;">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white; padding: 3rem;">
				
				<h2 v-html="post.title.rendered" class="title"></h2>

				<div class="columns">
					<div class="column is-6">
						6
					</div>
					<div class="column is-6">
						<h6 v-html="post.title.rendered"></h6>
						<p v-html="post.excerpt.rendered"></p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
					<h3 class="is-size-4">Summary</h3>
					<div v-html="post.meta_box._research_content_quote"></div>
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
			}
		},
		methods: {
			moment: () => {
				return moment();
			}
		},
		created() {
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research/?_embed&slug=' + this.slug)
		    .then(response => {
				this.post = response.data[0]
				console.log(response.data[0])
		    })
		    .catch(e => {
		      	this.errors.push(e)
		    })
		}
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
</style>