import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Dashboard from './navigation/Dashboard.js';
import Pantry from './navigation/Pantry.js';
import Calendar from './navigation/Calendar.js';
import Cookbook from './navigation/Cookbook.js';
import GroceryList from './navigation/GroceryList.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
