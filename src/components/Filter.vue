<template>
	<section class="hero bg-filter">
    	<div class="container">
			<div class="columns">
				<div class="column is-12">
      				<h2 v-if="this.$route.params.lang == 'fr'">De l’inspiration et des idées pour organiser quelque chose de formidable dans votre parc.</h2>
					<h2 v-else>Inspiration and ideas to make something awesome happen in your park</h2>
			  	</div>
			</div>
			<div class="columns">
			  	<div class="column is-6">
					<h6 v-if="this.$route.params.lang == 'fr'">Ce que vous pouvez faire dans les parcs.</h6>
					<h6 v-else>Things you can do in parks</h6>
					<p v-if="this.$route.params.lang == 'fr'">Des événements et des activités à faire dans votre parc.</p>
					<p v-else>Events and activities to do in your park</p>
				  	<ul id="ck-button">
						<li v-for="item in activity">
							<label>
							<input type="checkbox" @change="emitGlobalClickEvent" hidden v-model="checkedCategories" :value="item" />
							<span v-if="lang=='fr'">{{item.fr}}</span>
							<span v-if="lang=='en'">{{item.name}}</span>
							</label>
						</li>
					</ul>
				</div>
				<div class="column is-6">
					<h6 v-if="this.$route.params.lang == 'fr'">Ce qu’il faut savoir sur les parcs et les groupes de parcs.</h6>
					<h6 v-else>Things to know about parks and park groups</h6>
					<p v-if="this.$route.params.lang == 'fr'">Des outils de recherche et pratiques pour guider votre travail dans les parcs.</p>
					<p v-else>Research and practical tools to guide your work in parks</p>
				  	<ul id="ck-button">
						<li v-for="item in learn">
							<label>
							<input type="checkbox" @change="emitGlobalClickEvent" hidden v-model="checkedCategories" :value="item" />
							<span v-if="lang=='fr'">{{item.fr}}</span>
							<span v-if="lang=='en'">{{item.name}}</span>
							</label>
						</li>
					</ul>
				</div>
    		</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main.js';
export default {
	data() {
		return {
			errors: [],
			learn: [],
			activity: [],
			checkedCategories: [],
			lang: this.$route.params.lang
		};
	},
	methods: {
		emitGlobalClickEvent() {
			console.log('HIIII',this.checkedCategories);
      		eventBus.$emit('checked', this.checkedCategories);
    	}
	},
	created() {
		axios.all([
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/learn'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/resource'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/case-study'),
			axios.get('https://parkpeople.ca/listings/wp-json/wp/v2/research'),
		])
		.then(axios.spread((response, response1, response2, response3) => {
			

			const allResponses = response1.data.concat(response2.data, response3.data);

			function removeDuplicates(myArr, prop) {
				return myArr.filter((obj, pos, arr) => {
					return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
				});
			}

			// Activity Filter
			const categories = []
			for(let i = 0; i < allResponses.length; i++) {
				if(typeof(allResponses[i].all_lang_taxonomies.activity) != 'undefined') {
					const array = allResponses[i].all_lang_taxonomies.activity
					for(let j = 0; j < array.length; j++) {
						let duo = {};
						duo.name = array[j].name
						duo.fr = array[j].activity_french[0]
						
						let category = duo
						categories.push(category)
					}
				}
			}
			
			let uniqueActivities = removeDuplicates(categories, 'name')
			this.activity = uniqueActivities

			// Learn Filter
			const Lcategories = []
			for(let i = 0; i < allResponses.length; i++) {
				if(typeof(allResponses[i].all_lang_taxonomies.learn) != 'undefined') {
					const array = allResponses[i].all_lang_taxonomies.learn
					for(let j = 0; j < array.length; j++) {
						let duo = {};
						duo.name = array[j].name
						duo.fr = array[j].learn_french[0]

						let category = duo
						Lcategories.push(category)
					}
				}
			} 
			let uniqueLearns = removeDuplicates(Lcategories, 'name')
			this.learn = uniqueLearns

		}))
		.catch(e => {
			this.errors.push(e)
		})
	}
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.container {
	padding: 0 24px;
	@media #{$large-and-up} {
        padding: 0;
	}
}

h2 {
	color: $white;
	font-size: 35px;
	@media #{$large-and-up} {
        font-size: 45px;
	}
}

.bg-filter {
	background-color: #4a4a4a;
	padding: 40px 0 50px 0;
	color: $white;
	h4, h6, p {
		color: $white;
	}
}

.hero {
	color: white;
}

#ck-button {
	list-style-type: none;
	margin: 20px 0;
	padding: 0;
}

#ck-button li {
	font-weight: bold;
	text-transform: uppercase;
	font-family: $family-sanserif;
	& input + span {
		margin: 10px 10px 5px 0;
    	overflow:auto;
    	float:left;
		background-color: rgba(30,177,242, .2);
		color: rgba(250,250,250, 0.5);
		border-radius: 18px;
		padding: 8px 12px;
		&:hover, &:active {
			background-color: rgba(30,177,242, 1);
			color: rgba(250,250,250, 0.8);
		}
		&:not(:checked) {
			background-color: rgba(30,177,242, .2);
			color: rgba(250,250,250, 0.5);
		}
	}
	& input:checked + span {
    	background-color: rgba(30,177,242, 1);
    	color: rgba(250,250,250, 0.8);
	}
}

#ck-button {
	@media #{$small-and-down} {
		li {
			display: inline-block;
		}
		span {
			float: none !important;
			display: inline-block;
			font-size: 0.8rem;
		}
	}
}

</style>