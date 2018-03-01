<template>
    <section v-if="relatedPosts.length > 0" class="related-resources" style="margin-top: 50px;">
		<h3 v-if="lang=='fr'">Ressources associées</h3>
		<h3 v-else>Related Resources</h3>
		<div class="columns is-multiline">
			<div class="column is-one-quarter" v-for="related in relatedPosts.slice(0, 4)" :key="related.title.rendered">
				<router-link :to="'/'+lang+'/'+related.type + '/' + related.id + '/' + related.slug" class="related-card">
				<a class="card">
					<div class="card-image">
						<figure class="image is-2by1">
							<img v-if="related._embedded['wp:featuredmedia'] != undefined" :src="related._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
						</figure>
					</div>
					<div class="card-content">
						<div class="content">
							<a :to="'/'+lang+'/'+related.type + '/' + related.id + '/' + related.slug"><h4 v-html="related.title.rendered"></h4></a>
							<small v-if="lang == 'fr'" class="card-type-label">{{ $options.filters.translatedType(related.type) | removeHyphen | toTitleCase }}</small>
							<small v-else class="card-type-label"> {{ related.type | removeHyphen | toTitleCase }}</small> 
						</div>
					</div>
				</a>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        data() {
            return {
                lang: this.$route.params.lang
            };
        },
        components: {
        }
    }
</script>

<style lang="scss" scoped>

// Import Variables
@import '../styles/variables.scss';


</style>