import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header, ListItem, Card } from 'react-native-elements';

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

render() {
    return (
      <ThemeProvider>
        <Header centerComponent={{ text: 'PANTRY', style: { color: '#fff' } }}/>
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
      </ThemeProvider>
    );
  }
}