import * as types from './mutation-types'
import axios from 'axios';

export const actions = {
    getRelatedPosts( context ) {
        
    },
    updateTab(context, slug, name, taxID, order) {
        context.commit(types.SET_ACTIVE_TAB, slug, name, taxID, order)
    }
}