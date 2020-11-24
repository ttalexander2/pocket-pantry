const initialState = {
    editing: false,
    item: {
        id: 0,
        name: "",
        brand: "",
        amount: 1,
        unitofamount: "",
        expirationdate: new Date(),
        dateofpurchase: new Date(),
    }
}

const PantryEditData = (state = initialState, action) => {
    switch(action.type){
        case 'SET_EDITING':
            return {
                editing: action.editing,
                item: state.item,
            } 
        case 'SET_EDIT_ITEM':
            return {
                editing: state.editing,
                item: action.item,
            }
        case 'RESET_EDIT_ITEM':
            return {
                editing: state.editing,
                item: initialState.item,
            }
        default:
            return state;
    }
}
export default PantryEditData;