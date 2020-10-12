import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Dashboard from './src/navigation/Dashboard';
import Pantry from './src/navigation/Pantry';
import Calendar from './src/navigation/Calendar';
import Cookbook from './src/navigation/Cookbook';
import GroceryList from './src/navigation/GroceryList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Pantry" component={Pantry} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Cookbook" component={Cookbook} />
        <Tab.Screen name="Grocery List" component={GroceryList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
