import * as React from 'react';
import { View } from 'react-native';
import { Layout, Card, Text } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import Header from '../modules/Header';

const foodExpire = [{name: 'sushi', date: 'xx/xx'}, {name: 'nigiri', date: 'xx/xx'}, {name: 'ramen', date: 'xx/xx'}, {name: 'tempura', date: 'xx/xx'}]
const foodFavorite = [{name: 'sushi'}, {name: 'ramen'}]
const foodRecipe = [{name: 'sushi'}]



export default class Dashboard extends React.Component{

render() {
    return (
        <Layout>
            <HomeBar name='Dashboard' />
            <Text h1>Hello, World!</Text>
            <Card header={<Header title={'Food to be Expired this Week'} />}>
                {
                    foodExpire.map((expire) => {
                        return (
                            <Text>- {expire.date}: {expire.name}</Text>
                        );
                    })
                }
            </Card>
            <Card header={<Header title={'Food Favorites'} />}>
                {
                    foodFavorite.map((favorite) => {
                        return (
                            <Text>- {favorite.name}</Text>
                        );
                    })
                }
            </Card>
            <Card header={<Header title={'Recipe of the Day'} />}>
                {
                    foodRecipe.map((recipe) => {
                        return (
                            <Text> {recipe.name}</Text>
                        );
                    })
                }
            </Card>
        </Layout>
    );
  }
}