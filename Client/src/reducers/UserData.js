/*
This file holds the information about the user's account. It holds their
username, email, and a token specific to them
*/

const initialState = {
    username : "User",
    email: "Email",
    token: "none"
}

const UserInfo = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'SET_JWT_TOKEN':
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}
export default UserInfo;
