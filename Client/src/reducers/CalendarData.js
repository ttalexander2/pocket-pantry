/*
This file contains information for the items that are placed onto the calendar.
Specifically, it has their date of expiration and the name so that they can
be placed on the calendar in the correct location.
*/

const initialState = {
    expiration: {
            "2020-11-23": ["Onion", "Cilantro"],
            "2020-11-21": ["Banana", "Oranges", "Chicken nuggs", "Broccoli", "Sweet Potato"],
    },
}

const CalendarData = (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default CalendarData;
