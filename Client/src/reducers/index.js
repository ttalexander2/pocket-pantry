import { combineReducers } from 'redux';
import UserData from './UserData';
import CalendarData from './CalendarData';
import PantryData from './PantryData';
import PantryEditData from './PantryEditData';
import GroceryListData from './GroceryListData';
import GroceryListEditData from './GroceryListEditData';
import DashboardData from './DashboardData';

export default combineReducers({
    UserData,
    CalendarData,
    PantryData,
    PantryEditData,
    GroceryListData,
    GroceryListEditData,
    DashboardData
})