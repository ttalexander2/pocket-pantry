import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from '@ui-kitten/components';
import HomeBar from './HomeBar';

export default class Calendar extends React.Component{

render() {
    return (
      <View>
        <HomeBar name='Calendar' />
      </View>
    );
  }
}