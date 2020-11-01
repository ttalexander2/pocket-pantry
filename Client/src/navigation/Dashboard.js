import * as React from 'react';
import { View } from 'react-native';
import { Layout, Card, Text, List, ListItem } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import Header from '../modules/Header';

const foodExpire = [{name: 'sushi', date: 'xx/xx'}, {name: 'nigiri', date: 'xx/xx'}, {name: 'ramen', date: 'xx/xx'}, {name: 'tempura', date: 'xx/xx'}]
const foodFavorite = [{name: 'sushi'}, {name: 'ramen'}]
const foodRecipe = [{name: 'sushi'}]



const Dashboard = ({ navigation }) => {

    const renderItem = ({item, index}) => (
        <ListItem
        title={`${item.name}`}
        accessoryRight={() => (<Text>{item.date}</Text>)}
      />        
    );



    return (
        <Layout>
            <HomeBar name='Dashboard' navigation={navigation} />    
            <Text h1>Hello, World!</Text>
            <List
                data={foodExpire}
                renderItem={renderItem}
            />
        </Layout>
    );
}

export default Dashboard;