const initialState = {
    ingredients: [
        {
            id: 0,
            name: "Cilantro",
            brand: "N/A",
            amount: 1,
            unitOfAmount: "bushel",
            expirationDate: new Date("12/5/2020"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Green Onions",
            brand: "N/A",
            amount: 2.0,
            unitOfAmount: "gram(s)",
            expirationDate: new Date("12/10/2020"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Banana",
            brand: "N/A",
            amount: 2.0,
            unitOfAmount: "",
            expirationDate: new Date("12/5/2020"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Chicken",
            brand: "Ol' McDonald",
            amount: 1.0,
            unitOfAmount: "whole chickens",
            expirationDate: new Date("11/30/2020"),
            dateOfPurchase: new Date("11/20/2020"),
        },
        {
            id: 0,
            name: "Carrots",
            brand: "N/A",
            amount: 10.0,
            unitOfAmount: "",
            expirationDate: new Date("12/10/2020"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Pomegranate",
            brand: "N/A",
            amount: 2.0,
            unitOfAmount: "",
            expirationDate: new Date("12/19/2020"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Beef Jerky",
            brand: "Jack Links",
            amount: 0.5,
            unitOfAmount: "lb",
            expirationDate: new Date("10/1/2021"),
            dateOfPurchase: new Date("11/25/2020"),
        },
        {
            id: 0,
            name: "Peanut Butter",
            brand: "Jif (its pronounced gif not jif)",
            amount: 1,
            unitOfAmount: "container",
            expirationDate: new Date("1/1/2022"),
            dateOfPurchase: new Date("9/25/2020"),
        },
    ],
    meals: [
        {
            id: 0,
            name: "spaghetti",
            portions: 3,
            creation: new Date(),
        }
    ]
}

const PantryData = (state = initialState, action) => {
    let res = {}
    switch(action.type){
        case "SET_INGREDIENT_DATA":
            res = {
                ingredients: [...action.ingredients],
                meals: state.meals,
            }
            for (let i = 0; i < res.ingredients.length; i ++){
                res.ingredients[i].expirationDate = new Date(res.ingredients[i].expirationDate);
                res.ingredients[i].dateOfPurchase = new Date(res.ingredients[i].dateOfPurchase);
            }
            res.ingredients = [...res.ingredients]
            return (res);
        default:
            return state;
    }
}

export default PantryData;