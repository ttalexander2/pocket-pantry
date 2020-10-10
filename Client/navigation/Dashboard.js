import * as React from 'react';
import { ThemeProvider, Card, Header, Text } from 'react-native-elements';

const foodExpire = [{name: 'sushi', date: 'xx/xx'}, {name: 'nigiri', date: 'xx/xx'}, {name: 'ramen', date: 'xx/xx'}, {name: 'tempura', date: 'xx/xx'}]
const foodFavorite = [{name: 'sushi'}, {name: 'ramen'}]
const foodRecipe = [{name: 'sushi'}]

export default class Dashboard extends React.Component{

render() {
    return (
        <ThemeProvider>
            <Header centerComponent={{ text: 'DASHBOARD', style: { color: '#fff' } }}/>
            <Text h1>Hello, World!</Text>
            <Card>
                <Card.Title>Food to be Expired This Week</Card.Title>
                <Card.Divider/>
                {
                    foodExpire.map((expire) => {
                        return (
                            <Text>- {expire.date}: {expire.name}</Text>
                        );
                    })
                }
            </Card>
            <Card>
                <Card.Title>Food Favorites</Card.Title>
                <Card.Divider/>
                {
                    foodFavorite.map((favorite) => {
                        return (
                            <Text>- {favorite.name}</Text>
                        );
                    })
                }
            </Card>
            <Card>
                <Card.Title>Your Recommended Recipe of the Day</Card.Title>
                <Card.Divider/>
                {
                    foodRecipe.map((recipe) => {
                        return (
                            <Text> {recipe.name}</Text>
                        );
                    })
                }
            </Card>
        </ThemeProvider>
    );
  }
}