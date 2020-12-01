const initialState = {
    active: false,
    editing: false,
    item: {
        id: 0,
        name: "",
        brand: "",
        amount: 1,
        unitOfAmount: "",
        expirationDate: new Date(),
        dateOfPurchase: new Date(),
    },
    valid: {
        name: 'primary',
        brand: 'primary',
        amount: 'primary',
        unitOfAmount: 'primary',   
    }
}

const GroceryListEditData = (state = initialState, action) => {
    switch(action.type){
        case 'SET_ACTIVE':
            return {
                active: action.active,
                editing: state.editing,
                item: state.item,
                valid: state.valid,
            } 
        case 'SET_EDITING':
            return {
                active: state.active,
                editing: action.editing,
                item: state.item,
                valid: state.valid,
            } 
        case 'SET_EDIT_ITEM':
            return {
                active: state.active,
                editing: state.editing,
                item: {...action.item},
                valid: state.valid,
            }
        case 'SET_EDIT_NAME':
            let valid_name = 'primary';
            if (!action.name){
                valid_name = 'danger';
            }
            return {
                active: state.active,
                editing: state.editing,
                item: {
                    ...state.item,
                    name: action.name,
                },
                valid: {
                    ...state.valid,
                    name:valid_name
                }
            }
        case 'SET_EDIT_BRAND':
            let valid_brand = 'primary';
            if (!action.brand){
                valid_brand = 'danger';
            }
            return {
                active: state.active,
                editing: state.editing,
                item: {
                    ...state.item,
                    brand: action.brand,
                },
                valid: {
                    ...state.valid,
                    brand:valid_brand
                }
            }
        case 'SET_EDIT_AMOUNT':
            let valid_amount = 'primary';
            if (Number.isNaN(action.amount) || Number.isNaN(+(action.amount)) || Number.isNaN(Number.parseFloat(action.amount))){
                valid_amount = 'danger';
            }
            return {
                active: state.active,
                editing: state.editing,
                item: {
                    ...state.item,
                    amount: action.amount,
                },
                valid: {
                    ...state.valid,
                    amount:valid_amount
                }
            }
        case 'SET_EDIT_UNIT':
            let valid_unit = 'primary';
            if (!action.unitOfAmount){
                valid_unit = 'danger';
            }
            return {
                active: state.active,
                editing: state.editing,
                item: {
                    ...state.item,
                    unitOfAmount: action.unitOfAmount,
                },
                valid: {
                    ...state.valid,
                    unitOfAmount:valid_unit
                }
            }
        case 'SET_EDIT_EXPIRATION':
                return {
                    active: state.active,
                    editing: state.editing,
                    item: {
                        ...state.item,
                        expirationDate: action.expirationDate,
                    },
                    valid: state.valid,
                }
        case 'SET_EDIT_PURCHASE':
            return {
                active: state.active,
                editing: state.editing,
                item: {
                    ...state.item,
                    dateOfPurchase: action.dateOfPurchase,
                },
                valid: state.valid,
            }
        case 'RESET_EDIT_ITEM':
            return {
                active: state.active,
                editing: state.editing,
                item: initialState.item,
                valid: state.valid,
            }
        default:
            return state;
    }
}
export default GroceryListEditData;