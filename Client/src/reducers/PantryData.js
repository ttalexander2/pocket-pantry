const initialState = {
    ingredients: [
        {
            id: 0,
            upc: 0,
            name: "food",
            brand: "acme",
            amount: 2.0,
            unit: "gram(s)",
            expiration: new Date("11/25/2020"),
            purchase: new Date(),
        },
        {
            id: 0,
            upc: 0,
            name: "Chicken",
            brand: "Ol McDonald",
            amount: 1.0,
            unit: "Chickens",
            expiration: new Date("11/25/2020"),
            purchase: new Date(),
        }, 
    ],
    meals: [
        {
            id: 0,
            name: "spaghetti and meate and balls",
            portions: 3,
            creation: new Date(),
        }
    ]
}

const PantryData = (state = initialState, action) => {
    switch(action.type){  
        default:
            return state;
    }
}

export default PantryData;