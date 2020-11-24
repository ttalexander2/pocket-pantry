import { combineReducers } from 'redux';
import UserData from './UserData';
import CalendarData from './CalendarData';
import PantryData from './PantryData';

export default combineReducers({
    UserData,
    CalendarData,
    PantryData,
})