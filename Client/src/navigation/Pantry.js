import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';
import NewPantryForm from './../forms/NewPantryForm'
import { ThemeProvider, Header, Overlay, Card, Button } from 'react-native-elements';
import HomeBar from './HomeBar';

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

export default class Pantry extends React.Component{
  state = {formVisible: false}

render() {
    return (
      <ThemeProvider>
        <HomeBar name='Pantry' />
        <Card>
            <Card.Title>Food Items That You Have</Card.Title>
            <Card.Divider/>
            {
                list.map((u) => {
                    return (
                        <Text>- {u.name}: {u.subtitle}</Text>
                    );
                })
            }
          </Card>
          <Button title="Add an Item" onPress={() => {
            this.setState({formVisible: !this.state.formVisible });
          }}/>
          <Overlay isVisible={this.state.formVisible}>
            <NewPantryForm />
          </Overlay>
          
          
      </ThemeProvider>
    );
  }
}