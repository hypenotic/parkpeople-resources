import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0,
        checkedCategories: []
    },
    getters: {
        // doubleCounter is a function where we get state as an argument
        doubleCounter: state => {
            return state.counter * 2;
        },
        stringCounter: state => {
            return state.counter + "Clicks";
        },
        categoryList: state => {
            return state.checkedCategories;
        }
    }
})