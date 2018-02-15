import { state } from './state'

import { 
    SET_RESOURCES_EN, 
    SET_RESOURCES_FR,
    TOGGLE_LANGUAGE, 
    ADD_SINGLE_RESOURCE,
    SET_TRANSLATION_CHECK,
    SET_TRANSLATION_URL,
    SET_GRANTS_CHECK,
    SET_ACTIVE_TAB,
    SET_ACTIVE_LIST   
} from './mutation-types'

export const mutations = {
    SET_RESOURCES_EN(state, list) {
        state.resourceListEN = list
    },
    SET_RESOURCES_FR(state, list) {
        state.resourceListFR = list
    },
    TOGGLE_LANGUAGE(state, lang) {
        state.language = lang
    },
    ADD_SINGLE_RESOURCE(state, post, id) {
        let copy = state.singlePostCache
        // Check if key/post exist already
        if (copy.hasOwnProperty(id)) {
            console.log('POST ALREADY IN STORE')
            return
        } else {
            console.log('ADDING POST TO STORE')
            copy[id] = post;
            state.singlePostCache = copy
        }
        
    },
    SET_TRANSLATION_CHECK(state, check) {
        state.translatedCheck = check
    },
    SET_TRANSLATION_URL(state, url) {
        state.translatedURL = url
    },
    SET_GRANTS_CHECK(state, check) {
        state.grantsCheck = check
    },
    SET_ACTIVE_TAB(state, info) {
        state.activeTab = {'order:': info.order, 'slug': info.slug, 'name': info.name, 'id': info.id}
    },
    SET_ACTIVE_LIST(state, list) {
        // Now we have to get the posts that fall under the active tab
        let active = [];
        // Grab the active section ID
        let activeSectionID = state.activeTab.id;
        // Go through each post, and check if the section property's value (an array), contains the active section ID
        for(let i = 0; i < list.length; i++) {
            if (list[i].hasOwnProperty("section")) {
                console.log('has section property')
                if (list[i].section.includes(activeSectionID)) {
                    console.log('has section id');
                    // Add this posts to the active[]
                    active.push(list[i]);
                }
            }
        }
        // Set activePosts prop as active[]
        // this.activePosts = active
        // this.$store.commit('SET_ACTIVE_LIST', active)s
        state.activeList = active
    }
}