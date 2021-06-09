<template>
  <div v-if="post != null" class="resource-body">
    <div class="heading"></div>

    <section style="margin-top: -200px;">
      <div class="columns">
        <div
          class="column is-three-fifths is-offset-one-fifth"
          style="background-color: white; padding: 72px 72px 0;position: relative;margin-bottom: 30px;"
        >
          <div class="social-share-container">
            <div
              id="social-share-trigger"
              v-bind:class="{ 'social-menu-open': showSocialShare }"
              v-on:click="showSocialShare = !showSocialShare"
            >
              <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div>
            <ShareNetwork
              network="facebook"
              :url="`https://parkpeople.ca/resources${fullPath}`"
              :title="post.title.rendered"
              description=""
              quote=""
              hashtags=""
              twitter-user="Park_People"
              inline-template
            >
              <div class="social-share-buttons">
                <!--<network network="email">
                  <i class="fa fa-envelope"></i>
                </network>
                <network network="twitter">
                  <i class="fa fa-twitter"></i>
                </network>
                <network network="facebook">
                  <i class="fa fa-facebook"></i>
                </network>
                <network network="linkedin">
                  <i class="fa fa-linkedin"></i>
                </network>-->
              </div>
            </ShareNetwork>
          </div>
          <h1 v-html="post.title.rendered"></h1>

          <div class="category-lists">
            <div v-if="post.pure_taxonomies.hasOwnProperty('activity')">
              <span>Do in parks:</span>
              <ul>
                <li
                  v-for="category in post.pure_taxonomies.activity"
                  :key="category.name"
                >
                  {{ category.name }}
                </li>
              </ul>
            </div>
            <div v-if="post.pure_taxonomies.hasOwnProperty('learn')">
              <span v-if="this.$route.params.lang == 'fr'"
                >En savoir plus sur les parcs:</span
              >
              <span v-else>Know about parks:</span>
              <ul v-if="this.$route.params.lang == 'fr'">
                <li
                  v-for="category in post.all_lang_taxonomies.learn"
                  :key="category.name"
                >
                  {{ category.learn_french[0] }}
                </li>
              </ul>
              <ul v-else>
                <li
                  v-for="category in post.pure_taxonomies.learn"
                  :key="category.name"
                >
                  {{ category.name }}
                </li>
              </ul>
            </div>
          </div>

          <p class="meta">
            <span v-if="this.$route.params.lang == 'fr'">Ètude de cas</span
            ><span v-else>Case Study</span> |
            {{ formatDate(post.date) }}
          </p>

          <div
            class="resource__excerpt"
            v-html="post.excerpt.rendered"
            style="margin: 0;"
          ></div>
        </div>
      </div>
    </section>

    <img
      style="width: 100%; object-fit: cover; height: 300px; object-position: 0 30%;"
      :src="
        post._embedded['wp:featuredmedia'][0].media_details.sizes.full
          .source_url
      "
    />

    <section class="section section__single-resource">
      <div class="columns">
        <div
          class="column is-three-fifths is-offset-one-fifth"
          style="background-color: white;"
        >
          <h3
            v-if="post.meta_box._casestudy_context_heading != ''"
            v-html="post.meta_box._casestudy_context_heading"
          ></h3>
          <h3 v-else-if="this.$route.params.lang == 'fr'">Contexte</h3>
          <h3 v-else>Context</h3>
          <div
            class="case-study__context"
            v-html="post.meta_box._casestudy_content_context"
          ></div>

          <ol class="resource__bullets">
            <li
              v-for="item in post.meta_box._casestudy_list"
              :key="item['_resource_list_headline']"
            >
              <h4>{{ item["_resource_list_headline"] }}</h4>
              <p v-html="item['_resource_list_content']"></p>
            </li>
          </ol>

          <div
            v-if="post.meta_box._casestudy_content_vision != ''"
            class="resource__takeaways"
          >
            <h3
              v-if="post.meta_box._casestudy_vision_heading != ''"
              v-html="post.meta_box._casestudy_vision_heading"
            ></h3>
            <h3 v-else>Vision</h3>
            <div v-html="post.meta_box._casestudy_content_vision"></div>
          </div>

          <div
            v-if="post.meta_box._casestudy_content_approach != ''"
            class="resource__takeaways"
          >
            <h3
              v-if="post.meta_box._casestudy_approach_heading != ''"
              v-html="post.meta_box._casestudy_approach_heading"
            ></h3>
            <h3 v-else-if="this.$route.params.lang == 'fr'">Approche</h3>
            <h3 v-else>Approach</h3>
            <div v-html="post.meta_box._casestudy_content_approach"></div>
          </div>

          <div
            v-if="post.meta_box._casestudy_content_impact != ''"
            class="resource__takeaways"
          >
            <h3
              v-if="post.meta_box._casestudy_impact_heading != ''"
              v-html="post.meta_box._casestudy_impact_heading"
            ></h3>
            <h3 v-else-if="this.$route.params.lang == 'fr'">Incidence</h3>
            <h3 v-else>Impact</h3>
            <div v-html="post.meta_box._casestudy_content_impact"></div>
          </div>

          <div
            v-if="post.meta_box._casestudy_content_takeaway != ''"
            class="resource__takeaways"
          >
            <h3
              v-if="post.meta_box._casestudy_takeaway_heading != ''"
              v-html="post.meta_box._casestudy_takeaway_heading"
            ></h3>
            <h3 v-else-if="this.$route.params.lang == 'fr'">
              Points à retenir
            </h3>
            <h3 v-else>Takeaways</h3>
            <div v-html="post.meta_box._casestudy_content_takeaway"></div>
          </div>

          <div
            v-if="post.meta_box._casestudy_tips.length > 0"
            class="resource__tips"
          >
            <h3 v-if="this.$route.params.lang == 'fr'">
              Conseils et idées de bonus
            </h3>
            <h3 v-else>Tips &amp; Bonus Ideas</h3>

            <div>
              <ul class="resource__tips__bullets">
                <li
                  v-for="tip in post.meta_box._casestudy_tips"
                  :key="tip['_casestudy_tip_headline']"
                >
                  <h4 v-html="tip['_casestudy_tip_headline']"></h4>
                  <div v-html="tip['_casestudy_tip_content']"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="quote"
        v-if="
          post.meta_box._casestudy_content_quote != undefined &&
            post.meta_box._casestudy_content_quote != ''
        "
      >
        <blockquote
          class="full-width-quote"
          v-html="post.meta_box._casestudy_content_quote"
        ></blockquote>
        <cite>
          <small v-html="post.meta_box._casestudy_quote_name"></small>
          <small v-html="post.meta_box._casestudy_quote_group"></small>
        </cite>
      </div>

      <app-rec-links
        class="rec-link"
        v-if="
          post.meta_box.hasOwnProperty('_casestudy_links') &&
            post.meta_box._casestudy_links.length > 0
        "
        :rec-links="post.meta_box._casestudy_links"
      >
      </app-rec-links>
    </section>

    <app-related
      v-if="relatedPosts.length > 0"
      :related-resources="relatedPosts.slice(0, 4)"
    ></app-related>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";
import RelatedPosts from "../components/RelatedPosts.vue";
import RecLinks from "../components/RecLinks.vue";
export default {
  components: {
    appRelated: RelatedPosts,
    appRecLinks: RecLinks
  },
  data() {
    return {
      authorName: "",
      categories: [],
      categoryIDs: [],
      errors: [],
      fullPath: this.$route.fullPath,
      grantResource: false,
      id: this.$route.params.id,
      lang: this.$route.params.lang,
      post: null,
      relatedPosts: [],
      showSocialShare: false,
      slug: this.$route.params.slug,
      translated: false,
      translatedPost: []
    };
  },
  methods: {
    moment: () => {
      return moment();
    },
    formatDate(theDate) {
      var dateTime = moment(theDate);
      var ss = dateTime.format("MMM DD, YYYY");
      return ss.toString();
    }
  },
  filters: {
    removeHyphen(value) {
      return value.replace("-", " ");
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
      return value.replace(/(<([^>]+)>)/gi, "");
    },
    toTitleCase(value) {
      return value.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  created() {
    // Reset store check values
    this.$store.commit("SET_TRANSLATION_CHECK", false);

    axios
      .get(
        "https://parkpeople.ca/wp-json/wp/v2/case-study/" + this.id + "?_embed"
      )

      .then(response => {
        // Let's put data into post
        this.post = response.data;

        // Let's get the categories
        const tax1 = this.post.pure_taxonomies.activity;
        const tax2 = this.post.pure_taxonomies.learn;

        // Let's concat
        let taxAll = [];
        // const taxAll = tax1.concat(tax2)
        if (typeof tax1 != "undefined") {
          taxAll = tax1.concat(tax2);
        } else if (typeof tax2 != "undefined") {
          taxAll = tax2.concat(tax1);
        } else {
          return;
        }

        // Let's loop, skip over undefined and push
        for (let i = 0; i < taxAll.length; i++) {
          if (typeof taxAll[i] != "undefined") {
            this.categories.push(taxAll[i].name);
          }
        }

        // Let's see if there's a translation
        if (this.post.wpml_translations.length > 0) {
          console.log("translation post", this.post);
          console.log("translation exists", this.post.wpml_translations);
          let translatedID = this.post.wpml_translations[0].id;
          axios
            .get(
              "https://parkpeople.ca/wp-json/wp/v2/case-study/" +
                translatedID +
                "?_embed"
            )
            .then(response => {
              console.log(response.data);
              this.translatedPost = response.data;
              this.translated = true;
              let langTag = "";
              let transURL = "";
              if (this.$route.params.lang == "en") {
                langTag = "fr";
                transURL =
                  "/" +
                  langTag +
                  "/" +
                  response.data.type +
                  "/" +
                  response.data.id +
                  "/" +
                  response.data.slug;
              } else {
                langTag = "en";
                transURL =
                  "/" +
                  langTag +
                  "/" +
                  response.data.type +
                  "/" +
                  response.data.id +
                  "/" +
                  response.data.slug;
              }
              console.log(transURL);
              this.$store.commit("SET_TRANSLATION_CHECK", true);
              this.$store.commit("SET_TRANSLATION_URL", transURL);
              console.log(this.$store.state.translatedCheck);
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Translated Post Call", error.response.data);
                console.log("Translated Post Call", error.response.status);
                console.log("Translated Post Call", error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("Translated Post Call", error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error Translated Post Call", error.message);
              }
              console.log("Translated Post Call", error.config);
            });
        } else {
          console.log("no translation");
        }

        // Let's get the categories IDs
        let taxID1 = this.post.activity;
        let taxID2 = this.post.learn;

        let stringID1 = "0";
        if (taxID1.length > 0) {
          stringID1 = taxID1.join(",");
        }

        let stringID2 = "0";
        if (taxID2.length > 0) {
          stringID2 = taxID2.join(",");
        }

        console.log(stringID1, stringID2);

        // Let's make a call to get related posts
        axios
          .all([
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&activity=" +
                stringID1
            ),
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&activity=" +
                stringID1
            ),
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&activity=" +
                stringID1
            ),
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/case-study/?_embed&per_page=4&learn=" +
                stringID2
            ),
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/research/?_embed&per_page=4&learn=" +
                stringID2
            ),
            axios.get(
              "https://parkpeople.ca/wp-json/wp/v2/resource/?_embed&per_page=4&learn=" +
                stringID2
            )
          ])
          .then(
            axios.spread(
              (
                response,
                response1,
                response2,
                response3,
                response4,
                response5
              ) => {
                function removeDuplicates(myArr, prop) {
                  return myArr.filter((obj, pos, arr) => {
                    return (
                      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
                    );
                  });
                }

                let allPosts = response.data.concat(
                  response1.data,
                  response2.data,
                  response3.data,
                  response4.data,
                  response5.data
                );

                let noDups = removeDuplicates(allPosts, "id");

                noDups.sort(function(a, b) {
                  return new Date(b.date) - new Date(a.date);
                });

                this.relatedPosts = noDups;
              }
            )
          )
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("219", error.response.data);
              console.log("219", error.response.status);
              console.log("219", error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("219", error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error 219", error.message);
            }
            console.log("219", error.config);
          });

        // Let's make another API call to get author data by ID
        const authorID = response.data.author;
        axios
          .get("https://parkpeople.ca/wp-json/wp/v2/users/" + authorID)
          .then(response => {
            //console.log(response.data)
            this.authorName = response.data.name;
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("246", error.response.data);
              console.log("246", error.response.status);
              console.log("246", error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("246", error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error 246", error.message);
            }
            console.log("246", error.config);
          });
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("265", error.response.data);
          console.log("265", error.response.status);
          console.log("265", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("265", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error 265", error.message);
        }
        console.log("265", error.config);
      });
  }
};
</script>
