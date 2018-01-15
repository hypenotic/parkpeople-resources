import { state } from './state'
// export const state = {
    // resourceListEN: [],
    // resourceListFR: [],
    // singlePostCache: {},
    // language: ''
// }

import { 
    SET_RESOURCES_EN, 
    SET_RESOURCES_FR,
    TOGGLE_LANGUAGE, 
    ADD_SINGLE_RESOURCE 
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
            console.log('ADDING PSOT TO STORE')
            copy[id] = post;
            state.singlePostCache = copy
        }
        
    },
}