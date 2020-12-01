const initialState = {
    groceryList: [
        {
            id: 0,
            name: "Cilantro",
            amount: 1,
            unitOfAmount: "bushel",
        },
        {
            id: 0,
            name: "Green Onions",
            amount: 2.0,
            unitOfAmount: "gram(s)",
        },
        {
            id: 0,
            name: "Banana",
            amount: 2.0,
            unitOfAmount: "",
        },
        {
            id: 0,
            name: "Chicken",
            amount: 1.0,
            unitOfAmount: "whole chickens",
        },
        {
            id: 0,
            name: "Carrots",
            amount: 10.0,
            unitOfAmount: "",
        },
        {
            id: 0,
            name: "Pomegranate",
            amount: 2.0,
            unitOfAmount: "",
        },
        {
            id: 0,
            name: "Beef Jerky",
            amount: 0.5,
            unitOfAmount: "lb",
        },
        {
            id: 0,
            name: "Peanut Butter",
            amount: 1,
            unitOfAmount: "container",
        },
    ]
}

const GroceryListData = (state = initialState, action) => {
    let res = {}
    switch(action.type){
        case "SET_GROCERYLIST_DATA":
            res = {
                groceryList: [...action.groceryList],
            }
            res.groceryList = [...res.groceryList]
            return (res);
        default:
            return state;
    }
}

export default GroceryListData;