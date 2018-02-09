import { state } from './state'
// export const state = {
    // resourceListEN: [],
    // resourceListFR: [],
    // singlePostCache: {},
    // language: '',
    // translated: false
// }

import { 
    SET_RESOURCES_EN, 
    SET_RESOURCES_FR,
    TOGGLE_LANGUAGE, 
    ADD_SINGLE_RESOURCE,
    SET_TRANSLATION_CHECK,
    SET_TRANSLATION_URL,
    SET_GRANTS_CHECK,
    SET_ACTIVE_TAB   
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
}