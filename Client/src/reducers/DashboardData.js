/*
This file contains information for the items that are placed onto the calendar.
Specifically, it has their date of expiration and the name so that they can
be placed on the calendar in the correct location.
*/

const initialState = {
    recipe: {
        recipe:{
            title:'',
            href: '',
            ingredients: []
        }
    },
    recipeContent: null,
    loading: false,
    loaded: false,
}

const CalendarData = (state = initialState, action) => {
    switch(action.type){
        case 'SET_DASHBOARD_RECIPE':
            return {
                ...state,
                recipe: action.recipe,
            }
        case 'SET_DASHBOARD_RECIPE_CONTENT':
            return{
                ...state,
                recipeContent: action.recipeContent,
            }
        case 'SET_DASHBOARD_RECIPE_LOADING':
            return {
                ...state,
                loading: action.loading,
            }
        case 'SET_DASHBOARD_RECIPE_LOADED':
            return {
                ...state,
                loaded: action.loaded,
            }
        default:
            return state;
    }
}

export default CalendarData;
