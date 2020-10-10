import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

export default class Calendar extends React.Component{

render() {
    return (
      <ThemeProvider>
      <Header centerComponent={{ text: 'CALENDAR', style: { color: '#fff' } }}/>
      </ThemeProvider>
    );
  }
}