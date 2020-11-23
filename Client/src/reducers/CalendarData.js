const initialState = {
    expiration: {
            "2020-11-23": ["Onion", "Cilantro"],
            "2020-11-21": ["Banana", "Oranges", "Chicken nuggs", "Broccoli", "Sweet Potato"],
            "2020-11-29": ["My will to live"]
    },
}

const CalendarData = (state = initialState, action) => {
    switch(action.type){  
        default:
            return state;
    }
}
export default CalendarData;