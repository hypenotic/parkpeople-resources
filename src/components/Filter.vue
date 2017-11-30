<template>
	<section class="hero bg-filter">
    	<div class="container">
			<div class="columns">
				<div class="column is-12">
      				<h2>Stand on the shoulders of Park People</h2>
			  	</div>
			</div>
			<div class="columns">
			  	<div class="column is-6">
					<p>Doing things in Parks</p>
					<p>Lessons, inspiration and practical guides, oh my!</p>
				  	<ul>
					  	<li><a href="" class="bt-filter active">All</a></li>
						<li><a href="" class="bt-filter">Admin</a></li>
						<li><a href="" class="bt-filter">Sports/Recreation</a></li>
						<li><a href="" class="bt-filter">Arts & Culture</a></li>
						<li><a href="" class="bt-filter">Food</a></li>
						<li><a href="" class="bt-filter">Nature/Environment</a></li>
						<li><a href="" class="bt-filter">Enhancing Spaces</a></li>
					</ul>
				</div>
				
				<div class="column is-6">
					<p>Know about Parks</p>
					<p>Reports, case studies, analysis and adminstrative principles</p>
				  	<ul>
					  	<li><a href="" class="bt-filter active">All</a></li>
						<li><a href="" class="bt-filter">Admin</a></li>
						<li><a href="" class="bt-filter">Sports/Recreation</a></li>
						<li><a href="" class="bt-filter">Arts & Culture</a></li>
						<li><a href="" class="bt-filter">Food</a></li>
						<li><a href="" class="bt-filter">Nature/Environment</a></li>
						<li><a href="" class="bt-filter">Enhancing Spaces</a></li>
					</ul>
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
	.bg-filter {
		background-color: #4a4a4a;
		padding: 30px 0;
	}

	.hero {
		color: white;
	}

	.bt-filter {
		background-color: rgba(30,177,242, .2);
		color: rgba(250,250,250, 0.5);
		border-radius: 18px;
		padding: 8px 12px;
		font-weight: bold;
		text-transform: uppercase;
	}

	.bt-filter:hover {
		background-color: rgba(30,177,242, .5);
		color: rgba(250,250,250, 0.8);
	}

	.bt-filter.active {
		background-color: rgba(30,177,242, 1);
		color: rgba(250,250,250, 1);
	}

	ul {
		list-style-type: none;
    	margin: 20px 0;
    	padding: 0;
	}

	li {
		float: left;
		margin: 15px 10px 5px 0;
	}
</style>