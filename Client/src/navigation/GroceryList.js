import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from '@ui-kitten/components';
import HomeBar from './HomeBar';

export default class GroceryList extends React.Component{

render() {
    return (
      <View>
        <HomeBar name='Grocery List' />
      </View>
    );
  }
}