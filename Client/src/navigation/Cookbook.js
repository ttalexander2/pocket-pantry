import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';
import HomeBar from './HomeBar';

export default class Cookbook extends React.Component{

render() {
    return (
      <ThemeProvider>
      <HomeBar name='Cookbook' />
      </ThemeProvider>
    );
  }
}