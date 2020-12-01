import React from 'react';
import { SafeAreaView } from 'react-native';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Dashboard.js';
import Pantry from './Pantry.js';
import CalendarView from './Calendar.js';
import Cookbook from './Cookbook.js';
import GroceryList from './GroceryList.js';
import { PropsService } from '@ui-kitten/components/devsupport';

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

const AppNavigator = (props) => (
  <NavigationContainer >
      <Navigator style={{backgroundColor: 'blue'}} drawerContent={props => <DrawerContent {...props}/>}>
        <Screen name='Dashboard' component={Dashboard}/>
        <Screen name='Pantry' component={Pantry}/>
        <Screen name='Calendar' component={CalendarView}/>
        <Screen name='Cookbook' component={Cookbook}/>
        <Screen name='Groceries' component={GroceryList}/>
    </Navigator>
  </NavigationContainer>
);


export default AppNavigator;
