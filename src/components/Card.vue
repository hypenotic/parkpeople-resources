<template>
    <div class="column is-one-quarter single-card">
        <router-link v-if="this.$route.path == '/fr' || this.$route.path == '/en'" :to="lang+'/'+post.type + '/' + post.id + '/' + post.slug">
        <a class="card">
            <div class="card-image">
                <figure class="image is-2by1">
                    <img v-if="post._embedded.hasOwnProperty('wp:featuredmedia') && post._embedded['wp:featuredmedia'][0].media_details.sizes.hasOwnProperty('medium')" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
                    <img v-else-if="post._embedded.hasOwnProperty('wp:featuredmedia') && post._embedded['wp:featuredmedia'][0].media_details.sizes.hasOwnProperty('full')" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url">
                    <img v-else src="https://parkpeople.ca/custom/uploads/2018/01/placeimg_1000_500_nature2.jpg" alt="default park image">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <router-link :to="lang+'/'+post.type + '/' + post.id + '/' + post.slug"><h4 v-html="post.title.rendered"></h4></router-link>
                    <p v-if="lang == 'fr'" class="card-type-label">{{ $options.filters.translatedType(post.type) }}</p>
                    <p v-else class="card-type-label"> {{ post.type | removeHyphen | toTitleCase }}</p> 									
                </div>
            </div>
        </a>
        </router-link>
        <!-- If we're not on the home page, we need a different path for the link -->
        <router-link v-else :to="'/'+lang+'/'+post.type + '/' + post.id + '/' + post.slug">
        <a class="card">
            <div class="card-image">
                <figure class="image is-2by1">
                    <img v-if="post._embedded.hasOwnProperty('wp:featuredmedia') && post._embedded['wp:featuredmedia'][0].media_details.sizes.hasOwnProperty('medium')" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
                    <img v-else-if="post._embedded.hasOwnProperty('wp:featuredmedia') && post._embedded['wp:featuredmedia'][0].media_details.sizes.hasOwnProperty('full')" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url">
                    <img v-else src="https://parkpeople.ca/custom/uploads/2018/01/placeimg_1000_500_nature2.jpg" alt="default park image">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <router-link :to="'/'+lang+'/'+post.type + '/' + post.id + '/' + post.slug"><h4 v-html="post.title.rendered"></h4></router-link>
                    <p v-if="lang == 'fr'" class="card-type-label">{{ $options.filters.translatedType(post.type) }}</p>
                    <p v-else class="card-type-label"> {{ post.type | removeHyphen | toTitleCase }}</p> 									
                </div>
            </div>
        </a>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: ['post'],
        data() {
            return {
                lang: this.$route.params.lang
            };
        },
        components: {
        },
        created() {
            //console.log('Single card', this.post);
        },
        filters: {
            translatedType(type){
                if (type == 'resource') {
                    return 'Ressource';
                } else if ( type == 'research') {
                    return 'Recherche';
                } else if (type =='case-study') {
                    return 'Ètude de cas';
                } else if (type == 'video') {
                    return 'Vidéo';
                } else {
                    return 'Ressource';
                }
            },
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
                if (value.length < length)
                return value;	
                return value.substring(0, length) + suffix;
            },
            stripHTML(value) {
                return value.replace(/(<([^>]+)>)/ig,"");
            },
            toTitleCase(value) {
                return value.replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

// Import Variables
@import '../styles/variables.scss';

.card-content {
    padding: 0.7rem 1.2rem;
}

.content a h4 {
	color: rgba(30,177,242, 1);
	font-size: 1.2rem;
	line-height: 1.7rem;
	font-weight: 700;
	margin-bottom: 0.3rem;
	margin-top: 0.3rem;
	// line-height: 1.4;
	&:hover {
		color: rgba(30,177,242,0.7);
	}
}

.skewed-bg{
  	background: #ecebeb;
 	padding: 100px 0;
	transform: skew(0deg, -5deg);
  	margin-top: -130px;
	position: relative;
	z-index: -1;
}

img {
	object-fit: cover;
}

.card {
	display:flex;
    flex-direction: column;
	height: 100%;
}

.content {
	p {
		font-size: 0.8rem;
		line-height: 1.3rem;
	}
	ul {
		list-style-type: none;
		margin: 0 0 10px 0;
		li { 
			color: rgba(0,0,0,0.5);
			display: inline;
			font-weight: 700;
			&:not(:last-child):after {
				content: ", ";
			}
		}
	}
}

.card__activity-list,
.card__learn-list {
	li {
		font-family: $family-sanserif;
		// color: $blue;
		display: inline-block;
	}
}

.card .content {
	p {
		margin-bottom: 0.3rem;
	}
}


.card-type-label {
	color: rgba(0,0,0,0.5);
	font-family: $family-sanserif;
	font-family: $handwritten;
	font-size: 0.8rem !important;
	font-weight: bold;
	text-transform: uppercase;
	opacity: 0.5;
	margin-top: 16px;
}

.card {
	border-radius: 8px;
	transition: all .2s ease-in-out; 
	&:hover {
		transform: scale(1.01) rotate(1deg);
		// -webkit-box-shadow: 0 4px 6px -6px #222;
		// -moz-box-shadow: 0 4px 6px -6px #222;
		box-shadow: 0 5px 10px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);
		h4 {
			color: rgba(30, 177, 242, 0.7);
		}
	}
	.card-image, .card-image figure img  {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
}

.single-card:first-child {
	transform: rotate(-2deg);
}

.single-card:nth-child(7n) {
	transform: rotate(-2deg);
}

.single-card:nth-child(3n) {
	transform: rotate(2deg);
}

</style>
