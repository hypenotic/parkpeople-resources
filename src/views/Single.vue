<template>
<div>
	<img class="heading" src="/src/assets/placeimg_1000_500_nature2.jpg">
	<section style="margin-top: -200px;">
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth" style="background-color: white; padding: 72px 72px 0;position: relative;margin-bottom: 30px;">
			<h1>Frequently Asked Questions</h1>

			<p><b>Are small informal groups eligible to receive the grant?</b><br>
			<b>A:</b> Yes, Grassroots community groups, and small community based organizations are eligible.   In the case of smaller or newly formed groups who do not have event planning experience, we strongly suggest collaborating with a local organization that does. Grassroots community groups representing diverse communities or neighborhoods are especially encouraged to apply. 
			</p>

			<p><b>How do I find out more information?</b><br>
			<b>A:</b> During the last weeks of January and February 2018, Park People will host conference calls where we will answer any questions about the grant and application process. <a href="http://parkpeople.us2.list-manage.com/subscribe?u=ba963c8c64482c0ad756245c3&id=efc9b053b8" target="_blank">Please sign up to receive our newsletter</a> for updates on when these calls are taking place. If you have more detailed questions, please join us for these events. If you are unable to join us for those calls, please email your questions to admin@parkpeople.ca and a Park People staff member will be more than happy to answer any questions you may have about the grant. For questions about starting your own park group please check out our <a href="https://parkpeople.ca/start" target="_blank">"How to Start a Park Group"</a> page on the Park People website. 
			</p>

			<p><b>How are decisions made? </b><br>
			<b>A:</b> Decisions will be made by a team of reviewers comprised of Park People staff in consultation with TD and our local community partners from each municipality. 
			</p>

			<p><b>Applications will be based on the following criteria: </b><br>
			<ul>
				<li>Strength of the application - past event experience, compelling argument describing the proposed events</li>
				<li>Originality of the event ideas - aiming for many different types of events in parks</li>
				<li>Geographic diversity, representation of many neighbourhoods in each city</li>
				<li>How many people the events aim to reach</li>
				<li>Evidence of consideration of Inclusion/accessibility</li>
			</ul>
			</p>

			<p>While meeting any or all of these criteria will not guarantee that your group will be awarded a grant, these are some of the qualities that we are looking for in each application. 
			</p>

			<p><b>What counts as a park or green space? </b><br>
			<b>A:</b>  Park People defines parks and green spaces as public spaces readily accessible to the public. Examples of parks or green spaces include city parks, social housing landscapes and other urban green spaces that are publicly accessible. Private property or green spaces that are not open to the public are not eligible for the grant however if you have questions about your park or green space,  please get in touch with us to confirm eligibility. 
			</p>

			<p><b>What kind of events will this grant fund? </b><br>
			<b>A:</b> We hope that these events will help bring community members together and provide people with the opportunity to have fun and meet their neighbors. For example, your group could host a farmer’s market, picnic, nature walk, movie night or a pumpkin parade. You can find more ideas and guides on how to host events on Park People’s <a href="https://parkpeople.ca/start" target="_blank">resources</a> page and our <a href="https://parkpeople.ca/" target="_blank">parks group and events</a> page. 
			</p>

			<p><b>Can I combine this funding with funding from other sources?</b><br>
			<b>A:</b> Yes! The main purpose of this grant is to support the launch of new community park groups or grow existing ones. Community park groups organize volunteers to green, care for, and/or animate local parks with community based programming or events. Money received from this grant can be combined with other sources of funding.
			</p>

			<p><b>We are not based in one of the five cities listed above. Can we still apply for the grant? </b><br>
			<b>A:</b> Currently we are only accepting applications from community groups based in the selected cities (Toronto, Montreal, Vancouver, Ottawa, and Calgary). That said we hope to expand our program in subsequent years. The best way to keep up to date on changes in the TD Park People Grant program or other funding opportunities is to sign up for our newsletter and creating a <a href="https://parkpeople.ca/member-login/" target="_blank">profile for your group</a> on our website.
			</p>

			<p><b>How do we get a park permit and insurance? </b><br>
			<b>A:</b>  Each municipality has a different process for obtaining permits and insurance requirements for different events. Before applying to the TD Park People Grant, we strongly suggest that you review the insurance requirements and park permit application process for your city to ensure that your events comply with their regulations. If you have questions on how to obtain insurance for your event or insurance rates, please contact the parks department of your municipality for more information. Many municipalities offer event insurance or can direct you to an insurance provider.
			</p>

			<p><b>To find information on park permits for each municipality, please follow the link below:</b> 
			<ul>
			<li><a href="http://www.calgary.ca/CSPS/Parks/Pages/Bookings/Park-bookings.aspx" target="_blank">Calgary</a></li>
			<li><a href="https://ottawa.ca/en/residents/recreation-and-parks/parks-sports-fields-and-outdoor-recreation" target="_blank">Ottawa</a></li>
			<li><a href="https://www1.toronto.ca/wps/portal/contentonly?vgnextoid=48841d94f4301410VgnVCM10000071d60f89RCRD" target="_blank">Toronto</a></li>
			<li><a href="http://vancouver.ca/parks-recreation-culture/plan-and-book-an-event.aspx" target="_blank">Vancouver</a> </li>
			<li>Montreal </li>
			</ul>
			</p>
<p>
Note: To host an event or program in a green space or park in Montreal, you must first apply for an “Occupancy of public domain” permit. Permits are issued by the boroughs, so in order to book a space you must first contact the borough that manages the park where you would like to host your event. Below is a link to the City of Montreal’s directory of parks and gardens and the contact information of the boroughs that manage them. 
</p>
	
<a href="http://ville.montreal.qc.ca/portal/page?_pageid=5977,41729578&_dad=portal&_schema=PORTAL" target="_blank">Parks and gardens</a>

</div>
</div>
</section>
</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			errors: [],
			slug: this.$route.params.slug,
			id: this.$route.params.id,
			post: [],
			showSocialShare: false,
			fullPath: this.$route.fullPath,
			relatedPosts: [],
			language: ''
		}
	},
	filters: {
		removeHyphen(value){
			return value.replace("-", ' ');
		},
		capitalizeFirstLetter(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
		toUppercase(value) {
			return value.toUpperCase();
		},
		readMore(value, length, suffix) {
			if (value.length < length) {
				return value;
			} else {	
				return value.substring(0, length) + suffix;
			}
		},
		stripHTML(value) {
			return value.replace(/(<([^>]+)>)/ig,"");
		},
		toTitleCase(value)
			{
    		return value.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
	},
	methods: {
		moment: () => {
			return moment();
		},
	},
	created() {
		axios.get('https://parkpeople.ca/wp-json/wp/v2/resource/' + this.id + '?_embed')

		.then(response => {
			// Let's put data into post
			this.post = response.data
			console.log(this.post)

			// Let's get the categories
			const tax1 = this.post.pure_taxonomies.activity
			const tax2 = this.post.pure_taxonomies.learn

			// Let's concat
			let taxAll = [];
			// const taxAll = tax1.concat(tax2)
			if(typeof(tax1) != 'undefined'){
				taxAll = tax1.concat(tax2);
			} else if(typeof(tax2) != 'undefined') {
				taxAll = tax2.concat(tax1);
			} else {
				return;
			}
			
			// Let's loop, skip over undefined and push
			for(let i = 0; i < taxAll.length; i++) {
				if(typeof(taxAll[i]) != 'undefined') {
					this.categories.push(taxAll[i].name)
				}
			}

			// Let's get the WPML Lang id
			// this.lang = this.post.wpml_translations[0].id

			// Let's get the categories IDs
			let taxID1 = this.post.activity
			let taxID2 = this.post.learn

			let stringID1 = "0"
			if (taxID1.length > 0) {
				stringID1 = taxID1.join(',')
			}

			let stringID2 = "0"
			if (taxID2.length > 0) {
				stringID2 = taxID2.join(',')
			}
			
			console.log(stringID1, stringID2)

			// Let's make a call to get related posts
			axios.all([
				axios.get('https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&activity='+stringID1),
				axios.get('https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&activity='+stringID1),
				axios.get('https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&activity='+stringID1),
				axios.get('https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&learn='+stringID2),
				axios.get('https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&learn='+stringID2),
				axios.get('https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&learn='+stringID2)
			])
			.then(axios.spread((response, response1, response2, response3, response4, response5) => {
				
				function removeDuplicates(myArr, prop) {
					return myArr.filter((obj, pos, arr) => {
						return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
					});
				}

				let allPosts  = response.data.concat(response1.data, response2.data, response3.data, response4.data, response5.data)

				let noDups = removeDuplicates(allPosts, 'id')

				noDups.sort(function(a,b){
					return new Date(b.date) - new Date(a.date)
				})	
				
				this.relatedPosts = noDups

			}))
			.catch(error => {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('219', error.response.data);
				console.log('219', error.response.status);
				console.log('219', error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('219', error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error 219', error.message);
				}
				console.log('219', error.config);
			})


			// Let's make another API call to get author data by ID
			const authorID = response.data.author
			axios.get('https://parkpeople.ca/wp-json/wp/v2/users/' + authorID) 
			.then(response => {
				//console.log(response.data)
				this.authorName = response.data.name
			})
			.catch(error => {
				if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('246', error.response.data);
				console.log('246', error.response.status);
				console.log('246', error.response.headers);
				} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log('246', error.request);
				} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error 246', error.message);
				}
				console.log('246', error.config);
			})
		})
		.catch(error => {
			if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log('265', error.response.data);
			console.log('265', error.response.status);
			console.log('265', error.response.headers);
			} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log('265', error.request);
			} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error 265', error.message);
			}
			console.log('265', error.config);
		})
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

h1 {
	color: $off-black;
	font-size: 2.5rem;
	line-height: 1.3;
	margin-bottom: 24px;
	font-weight: bold;
}

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

ul {
	margin: 20px 0 0 40px;
	li {
		line-height: 1.5;
		margin-bottom: 1rem;
		list-style-type: disc;
		font-size: .9rem;
		padding-left: .6em;

	}
}

</style>