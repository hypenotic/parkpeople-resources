import * as types from './mutation-types';
import axios from 'axios';

export const actions = {
    getRelatedPosts( context ) {
        
    },
    updateTab({commit, dispatch, context, state}, info) {
        console.log('updateTab dispatched');
        commit(types.SET_ACTIVE_TAB, info);
        // NEED TO DO A CHECK FOR FR
        if (info.lang == 'en') {
            console.log('ENGLISH');
            dispatch('renderList',{'type': 'tab-change', 'list': state.resourceListEN});
        } else {
            console.log('FRENCH');
            dispatch('renderList',{'type': 'tab-change', 'list': state.resourceListFR});
        } 
    },
    renderList({commit, dispatch, context, state}, info) {
        console.log('renderList dispatched');
        if ( info.type == 'tab-change') {
            // When primary (main tab) filters are clicked
            dispatch('createActiveList', info.list);
        } else if (info.type == 'filter-change') {
            // When secondary filters are clicked
            dispatch('createFilteredList', {'checked': info.checked, 'list': info.list});
        } else {
            // Initial load
            dispatch('createActiveList', info.list);
        }
        // Dispatch the action to create the filters
        dispatch('renderFilters',{'type': 'initial-load', 'list': state.activeList});
    },
    createActiveList({commit, dispatch, context, state}, list) {
        console.log('createActiveList dispatched');
        // Now we have to get the posts that fall under the active tab
        let active = [];
        // Grab the active section ID
        let activeSectionID = state.activeTab.id;
        let activeSectionName = state.activeTab.name;
        // Go through each post, and check if the section property's value (an array), contains the active section ID
        for(let i = 0; i < list.length; i++) {
            if (list[i].hasOwnProperty("section")) {
                // console.log('has section property')
                if (list[i].section.includes(activeSectionID)) {
                    console.log('has section id - ', activeSectionName);
                    // Add this posts to the active[]
                    active.push(list[i]);
                }
            }
        }
        commit(types.SET_ACTIVE_LIST, active)
    },
    createFilteredList({commit, dispatch, context, state}, info) {
        console.log('createFilteredList dispatched',info);
        let filterMatches = [];
        for(let i = 0; i < info.list.length; i++) {
    
            let combined = [];

            if (info.list[i].pure_taxonomies.hasOwnProperty("learn")) {
                for(let p = 0; p < info.list[i].pure_taxonomies.learn.length; p++) {
                    combined.push(info.list[i].pure_taxonomies.learn[p]['name']);
                }
            }

            if (info.list[i].pure_taxonomies.hasOwnProperty("activity")) {
                for(let p = 0; p < info.list[i].pure_taxonomies.activity.length; p++) {
                    combined.push(info.list[i].pure_taxonomies.activity[p]['name']);
                }
            }

            var findOne = function (haystack, arr) {
                return arr.some(function (v) {
                    return haystack.indexOf(v) >= 0;
                });
            }

            // let nameArray = [];
            // for(let n = 0; n < info.checked.length; n++) {
            //     let name = info.checked[n].name;
            //     nameArray.push(name);
            // }
            let nameArray = info.checked;

            var test = findOne(combined,nameArray);

            if (test == true) {
                filterMatches.push(info.list[i]);
            }
            
        }
        filterMatches.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        })	

        if (filterMatches.length > 0) {
            commit(types.SET_FILTERED_LIST, filterMatches)
        } else {
            commit(types.SET_FILTERED_LIST, info.list)
        }

        
    },
    renderFilters(context, info) {
        console.log('renderFilters dispatched', info.list);
        let list = info.list;

        // This function checks that two objects don't have the name values for a property
		function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }

        // Activity Filter
        const categories = []
        for(let i = 0; i < list.length; i++) {
            if(typeof(list[i].all_lang_taxonomies.activity) != 'undefined') {
                const array = list[i].all_lang_taxonomies.activity;
                for(let j = 0; j < array.length; j++) {
                    // We have to make sure the EN and FR taxonomy names are in one object, so it's easy to toggle between the two
                    // Create an object to hold the EN and FR taxonomy names
                    let duo = {};
                    // Add the key 'name' that hold the EN version
                    duo.name = array[j].name;
                    // Add the key 'fr' that holds the FR version
                    if (array[j].hasOwnProperty('activity_french')) {
                        duo.fr = array[j].activity_french[0];
                    } else {
                        duo.fr = '';
                    }
                    duo.slug = array[j].slug;
                    
                    // Might be able to delete this...we can just pass 'duo' at this point...
                    let category = duo;
                    // 
                    categories.push(category);
                }
            }
        }
        
        // console.log(categories);

        let uniqueActivities = removeDuplicates(categories, 'name');

        // Learn Filter
        const Lcategories = []
        for(let i = 0; i < list.length; i++) {
            if(typeof(list[i].all_lang_taxonomies.learn) != 'undefined') {
                const array = list[i].all_lang_taxonomies.learn
                for(let j = 0; j < array.length; j++) {
                    let duo = {};
                    duo.name = array[j].name
                    if (array[j].hasOwnProperty('learn_french')) {
                        duo.fr = array[j].learn_french[0];
                    } else {
                        duo.fr = '';
                    }
                    duo.slug = array[j].slug;

                    let category = duo;
                    Lcategories.push(category);
                }
            }
        } 
        let uniqueLearns = removeDuplicates(Lcategories, 'name');

        // Get final buttons
        // Function to sort alphabetically by name
        function compare(a, b) {   
            // Use toUpperCase() to ignore character casing
            const genreA = a.name.toUpperCase();
            const genreB = b.name.toUpperCase();
          
            let comparison = 0;
            if (genreA > genreB) {
              comparison = 1;
            } else if (genreA < genreB) {
              comparison = -1;
            }
            return comparison;
        }

        let finalCategories = uniqueActivities.concat(uniqueLearns);
        let uniqueButtons = removeDuplicates(finalCategories, 'name');
        uniqueButtons.sort(compare);

        context.commit(types.SET_FILTERS, uniqueButtons);
    },
    filterChange({commit, dispatch, context, state}, checkedCategories) {
        // commit(types.SET_FILTERS, state.activeList);
        // commit(types.SET_CHECKED_LIST, checkedCategories);
        dispatch("renderList", {'type': 'filter-change', 'list': state.activeList, 'checked': checkedCategories})
    },
    clearFilters({commit, dispatch, context, state}, status) {
        if (status == 'active') {
            dispatch("renderList", {'type': 'filter-reset', 'list': state.activeList})
        } else {
            return
        }
        
    }
}