<template>
	<section class="hero bg-filter">
    	<div class="container">
			<div class="columns">
				<div class="column is-12">
      				<h4>Stand on the shoulders of Park People</h4>
			  	</div>
			</div>
			<div class="columns">
			  	<div class="column is-6">
					<h6>Doing things in Parks</h6>
					<p>Lessons, inspiration and practical guides, oh my!</p>
				  	<ul>
					  	<li><a href="" class="bt-filter active">All</a></li>
						<li v-for="item in activity"><a href="" class="bt-filter">{{ item }}</a></li>
					</ul>
				</div>
				
				<div class="column is-6">
					<h6>Know about Parks</h6>
					<p>Reports, case studies, analysis and adminstrative principles</p>
				  	<ul>
					  	<li><a href="" class="bt-filter active">All</a></li>
						<li v-for="item in learn" v-if="item.count > 0"><a href="" class="bt-filter">{{ item.name }}</a></li>
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
			errors: [],
			learn: [],
			activity: []
		};
	},
	created() {
		axios.all([
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/learn'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research'),
		])
		.then(axios.spread((response, response1, response2, response3) => {
			
			// Learn Filter
			this.learn = response.data
			
			// Activity Filter
			const allResponses = response1.data.concat(response2.data, response3.data);
			const categories = []
			for(let i = 0; i < allResponses.length; i++) {
				if(typeof(allResponses[i].pure_taxonomies.activity) != 'undefined') {
					const array = allResponses[i].pure_taxonomies.activity
					//console.log(array)
					for(let j = 0; j < array.length; j++) {
						let category = array[j].name
						categories.push(category)
					}
				}
			}
			const catUnique = [...new Set(categories)]
			this.activity = catUnique
		}))
		.catch(e => {
			this.errors.push(e)
		})
	}
};
</script>

<style scoped>
	.bg-filter {
		background-color: #4a4a4a;
		padding: 40px 0 50px 0;
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