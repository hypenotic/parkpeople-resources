<template>
    <div class="rec-link">
        <h3 v-if="lang=='fr'">Liens recommandés</h3>
        <h3 v-else>Recommended Links</h3>
        <ul class="resource__rec-link__list">
            <li v-for="(recLink, index) in recLinks" :key="index">
				<h4 v-if="recLink['_research_link_headline'] != undefined" v-html="recLink['_research_link_headline']"></h4>
				<h4 v-else v-html="recLink['_resource_link_headline']"></h4>
                <p v-if="recLink['_research_link_excerpt'] != undefined" v-html="recLink['_research_link_excerpt']"></p>
				<p v-else v-html="recLink['_resource_link_excerpt']"></p>
                <a v-if="recLink['_research_link_url'] != undefined" class="button button--ghost button--orange" :href="recLink['_research_link_url']" target="_blank"><span v-if="lang == 'fr'">Lis</span><span v-else>View</span></a>
                <a v-else class="button button--ghost button--orange" :href="recLink['_resource_link_url']" target="_blank"><span v-if="lang == 'fr'">Lis</span><span v-else>View</span></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['recLinks'],
    data() {
        return {
            lang: this.$route.params.lang
        };
    },
    filters: {
		translatedType(type){
			if (type == 'resource') {
				return 'ressource'
			} else if ( type == 'research') {
				return 'recherche'
			} else {
				return 'étude de cas'
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
}
</script>

<style lang="scss" scoped>

// Import Variables
@import '../styles/variables.scss';

.resource__rec-link__list {
	@media #{$large-and-up} {
		margin-top: 32px;
        display: flex;
		justify-content: center;
		>li {
			width: 25%;
			margin: 0 4%;
		}
	}
	h4 {
		font-size: 32px;
		font-weight: bold;
		@media #{$large-and-up} {
			font-size: 1.2rem;
			line-height: 1.5;
		}
	}
}

.rec-link {
	h3 {
		text-align: center;
	}
}


.rec-link {
	padding: 80px 0 0;
}

</style>