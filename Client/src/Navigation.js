import React from 'react';
import { SafeAreaView } from 'react-native'; 
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './navigation/Dashboard.js';
import Pantry from './navigation/Pantry.js';
import CalendarView from './navigation/Calendar.js';
import Cookbook from './navigation/Cookbook.js';
import GroceryList from './navigation/GroceryList.js';

const {Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Dashboard' />
    <DrawerItem title='Pantry' />
    <DrawerItem title='Calendar' />
    <DrawerItem title='Cookbook' />
    <DrawerItem title='Groceries' />
  </Drawer>
);

const AppNavigator = () => (
  <NavigationContainer>
      <Navigator style={{backgroundColor: 'blue'}}drawerContent={props => <DrawerContent {...props}/>}>
        <Screen name='Dashboard' component={Dashboard}/>
        <Screen name='Pantry' component={Pantry}/>
        <Screen name='Calendar' component={CalendarView}/>
        <Screen name='Cookbook' component={Cookbook}/>
        <Screen name='Groceries' component={GroceryList}/>
    </Navigator>
  </NavigationContainer>
);


export default AppNavigator;