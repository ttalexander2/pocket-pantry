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
    name: 'Sushi',
    subtitle: 'Alot'
  },
  {
    name: 'Nachos',
    subtitle: '20'
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
      <ThemeProvider style={{flex: 1, flexDirection: 'row'}}>
        <HomeBar name='Pantry' />
        <Card style={ {width: '45%'}} >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Card.Title style={{fontSize: '28.1px'}}>Your Pantry</Card.Title>
              <Button style={{margin: 'auto', paddingBottom: '15px' }} title="Add an Item"  onPress={() => {
              this.setState({formVisible: !this.state.formVisible });
              }}/>
          </div>
            <Card.Divider/>
                {
                  list.map((u) => {
                      return (
                        <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                          <li style={{float: 'left', display: "inline-block"}}>
                            <div>{u.name}: {u.subtitle}</div>
                          </li>
                        </ul>
                        );
                  })
                }
          </Card>


          {
            this.state.formVisible &&
            <NewPantryForm />
          }
          
      </ThemeProvider>
    );
  }
}