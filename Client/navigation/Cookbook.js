import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

export default class Cookbook extends React.Component{

render() {
    return (
      <ThemeProvider>
      <Header centerComponent={{ text: 'COOKBOOK', style: { color: '#fff' } }}/>
      </ThemeProvider>
    );
  }
}