/*
We needed to use redux to handle the passing of information to and from the
database and to update the app when the information is changed
*/

import { createStore } from 'redux';
import rootReducer from '../reducers';

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
