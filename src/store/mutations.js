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
    SET_ACTIVE_LIST,
    SET_FILTERED_LIST,
    SET_CHECKED_LIST,
    SET_FILTERS      
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
            // console.log('POST ALREADY IN STORE')
            return
        } else {
            // console.log('ADDING POST TO STORE')
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
        // Clear category list
        state.categoryList = []
        // Set new active tab info
        state.activeTab = {'order': info.order, 'slug': info.slug, 'name': info.name, 'id': info.id}
    },
    SET_ACTIVE_LIST(state, active) {
        // console.log('SET_ACTIVE_LIST', active)
        state.activeList = active
        state.filteredList = active
    },
    SET_FILTERED_LIST(state, matches) {
        // console.log('SET_FILTERED_LIST')
        state.filteredList = matches
    },
    SET_CHECKED_LIST(state, checked) {
         //console.log('SET_CHECKED_LIST')
        state.checkedList = checked
    },
    SET_DISPLAYED_LIST(state, list) {
        
    },
    SET_FILTERS(state, filters) {
        state.filterButtons = filters
    },
    SET_LOADING_STATUS(state, status) {
        // console.log('the loading status is:'+status);
        state.loadingStatus = status
    },
}
