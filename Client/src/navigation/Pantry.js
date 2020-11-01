import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Card } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import { Layout, Text } from '@ui-kitten/components';

const list = [
  {
    name: 'Rice',
    subtitle: '120 Grains'
  },
  {
    name: 'Pasta',
    subtitle: '232 Shells'
  }
]

export default class Pantry extends React.Component {
  render(){
    return(
      <Layout>
        <HomeBar name='Pantry' navigation={this.props.navigation}/>
      </Layout>
    )
  }
};

/*===========================Styles================================*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});