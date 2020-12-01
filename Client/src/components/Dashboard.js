/*
This file is the first screen the user is brought to when they open our app.
They can view items they have that are expiring soon, they can see their
current favorite food item, and a suggested recipe. They can also navigate
to any of the other pages in the app
*/

import * as React from 'react';
import { StyleSheet, View, Linking, ActivityIndicator, Image } from 'react-native';
import { Layout, Card, Text, List, ListItem, Button, Spinner } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import jwtDecode from 'jwt-decode';
import { connect, useSelector } from 'react-redux';

export var foodExpire = []
export var foodFavorite = []
export var foodRecipe = []


const HeaderExpire = (props) => (
    <View {...props} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text category='h3'>Pantry Items Expiring Soon:</Text>
        </div>
    </View>
);
const HeaderFavorite = (props) => (
    <View {...props} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text category='h3'>Current Food Favorites:</Text>
        </div>
    </View>
);
const HeaderRecipe = (props) => (
    <View {...props} >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text category='h3'>Recommended Recipe:</Text>
        </div>
    </View>
);

const AboutToExpire = (expireData) => {
    expireData.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
    return (
        [...Array(Math.min(5, expireData.length)).keys()].map((i) => {
            let expirationDate = new Date(expireData[i].expirationDate);
            let food = String(expireData[i].name)

            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var day = weekday[expirationDate.getDay()];

            let date = String(day + ", " + (expirationDate.getMonth() + 1) + "/" + expirationDate.getDate() + "/" + expirationDate.getFullYear());
            return (
                <ul style={{ margin: '0', padding: '0', listStyle: "circle" }}>
                    <li style={{ float: 'left', display: "inline-block" }}>
                        <Text style={{ fontSize: '22px' }}>({i + 1}) {food} expires on {date}</Text>
                    </li>
                </ul>
            )

        })
    )
}

const Favorites = (expireData) => {
    let favItem = "";
    let highestAmount = 0;
    expireData.map((food) => {
        if (food.amount > highestAmount) {
            favItem = food.name;
            highestAmount = food.amount;
        }
    })
    return (
        <ul style={{ margin: '0', padding: '0', listStyle: "circle" }}>
            <li style={{ float: 'left', display: "inline-block" }}>
                <Text style={{ fontSize: '22px' }}>{favItem}</Text>
            </li>
        </ul>
    );
}


const Dashboard = (props) => {

    const username = useSelector(state => state.UserData.username);
    const expireData = useSelector(state => state.PantryData.ingredients);
    const recommendedRecipe = useSelector(state => state.DashboardData.recipe.results)
    const recipeContent = useSelector(state => state.DashboardData.recipeContent);
    const recipeLoading = useSelector(state => state.DashboardData.loading);
    const recipeLoaded = useSelector(state => state.DashboardData.loaded);


    const renderButton = () => {
        if (recipeLoaded || recipeLoading) {
            return (<Text></Text>)
        }
        return (
            <Button style={{ margin: '10px', marginTop: '20px' }} onPress={() => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append('Access-Control-Allow-Origin', '*');

                var raw = JSON.stringify({ 'url': recommendedRecipe[0].href });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                props.dispatch({ type: 'SET_DASHBOARD_RECIPE_LOADING', loading: true });

                fetch("https://pocketpantry.app/api/recipes/scrape", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        props.dispatch({ type: 'SET_DASHBOARD_RECIPE_LOADED', loaded: true });
                        props.dispatch({ type: 'SET_DASHBOARD_RECIPE_LOADING', loading: false });
                        props.dispatch({ type: 'SET_DASHBOARD_RECIPE_CONTENT', recipeContent: JSON.parse(result) });
                    })
                    .catch(error => console.log('error', error));
            }}>Open</Button>
        )

    }

    return (
        <Layout >
            <HomeBar name='Dashboard' navigation={props.navigation} />
            <Text style={{ paddingLeft: '24px', paddingBottom: '16px', borderBottom: '5px solid royalblue' }} category='h1'>Hello, {username}!</Text>
            <React.Fragment >
                <Card style={styles.card, { width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px' }} header={HeaderExpire}>
                    {
                        AboutToExpire(expireData)
                    }
                </Card>
                <Card style={styles.card, { width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px' }} header={HeaderFavorite}>
                    {
                        Favorites(expireData)
                    }
                </Card>
                <Card style={styles.card, { width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px' }} header={HeaderRecipe}>
                    {
                        recommendedRecipe
                            ?
                            <Layout style={{ display: 'flex', flexDirection: 'row', borderBottom: '3px solid royalblue', borderTop: '3px solid aliceblue', padding: '5px', margin: '5px' }}>
                                <Layout >
                                    {

                                        renderButton()
                                    }
                                </Layout>
                                <Layout>
                                    <Text category='h3'>
                                        {recommendedRecipe[0].title.trim()}
                                    </Text>
                                    <Text category='h6' style={{ fontStyle: 'italic' }}>Ingredients: {recommendedRecipe[0].ingredients}</Text>
                                    <Text style={{ color: 'blue' }}
                                        onPress={() => Linking.openURL(recommendedRecipe[0].href)}>
                                        {recommendedRecipe[0].href}
                                    </Text>
                                    {
                                        recipeLoading?
                                        <Spinner />
                                        :
                                        <Text></Text>
                                    }
                                    {
                                        recipeContent
                                            ?
                                            recipeContent.hasOwnProperty('title')
                                                ?
                                                <View>
                                                    {
                                                        recipeContent.hasOwnProperty('image')
                                                        &&
                                                        <Image
                                                            source={{ uri: recipeContent.image }}
                                                            style={{ width: 200, height: 200 }}
                                                            PlaceholderContent={<ActivityIndicator />}
                                                        />
                                                    }
                                                    <Text category='h4'>
                                                        {
                                                            recipeContent.hasOwnProperty('yield')
                                                            &&
                                                            recipeContent.yield
                                                        }
                                                    </Text>
                                                    <Text category='h3'>
                                                        Ingredients
                                  </Text>
                                                    <View>
                                                        {
                                                            recipeContent.hasOwnProperty('ingredients')
                                                            &&
                                                            recipeContent.ingredients.map((item) => {
                                                                return (
                                                                    <Text>
                                                                        - {item}
                                                                    </Text>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <Text category='h3'>
                                                        Instructions
                                  </Text>
                                                    <Text>
                                                        {
                                                            recipeContent.hasOwnProperty('instructions')
                                                            &&
                                                            recipeContent.instructions
                                                        }
                                                    </Text>
                                                </View>
                                                :
                                                <Text></Text>
                                            :
                                            <Text></Text>
                                    }
                                </Layout>
                            </Layout>
                            :
                            <Text></Text>
                    }
                </Card>
            </React.Fragment>
        </Layout>
    );
};

export default connect()(Dashboard);


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
