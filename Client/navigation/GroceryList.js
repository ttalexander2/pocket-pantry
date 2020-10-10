import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

export default class GroceryList extends React.Component{

render() {
    return (
      <ThemeProvider>
      <Header centerComponent={{ text: 'GROCERY LIST', style: { color: '#fff' } }}/>
      </ThemeProvider>
    );
  }
}