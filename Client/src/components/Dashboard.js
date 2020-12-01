import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Text, List, ListItem } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import jwtDecode from 'jwt-decode';
import { connect, useSelector } from 'react-redux';

export var foodExpire = []
export var foodFavorite = []
export var foodRecipe = []


const HeaderExpire = (props) => (
    <View {...props} >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Text category='h3'>Your Food Expiring Soon...</Text>
      </div>
    </View>
  );
const HeaderFavorite = (props) => (
<View {...props} >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Text category='h3'>Your Current Food Favorite...</Text>
    </div>
</View>
);
const HeaderRecipe = (props) => (
<View {...props} >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Text category='h3'>Recommended Recipe Search:</Text>
    </div>
</View>
);

const AboutToExpire = (expireData) => {
    expireData.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
    return(
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

                let date = String(day + ", " + (expirationDate.getMonth()+1) + "/" + expirationDate.getDate() + "/" + expirationDate.getFullYear());
                return (                      
                    <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                        <li style={{float: 'left', display: "inline-block"}}>
                        <Text style={{fontSize: '22px'}}>({i+1}) {food} expires on {date}</Text>
                        </li>
                    </ul>
                )
    
            //}
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
    <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
        <li style={{float: 'left', display: "inline-block"}}>
        <Text style={{fontSize: '22px'}}>{favItem}</Text>
        </li>
    </ul>
    );
}

const Recommended = (expireData) => {
    expireData.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
    let search = "";
    [...Array(Math.min(5, expireData.length)).keys()].map((i) => {
        let expirationDate = new Date(expireData[i].expirationDate);
        let food = String(expireData[i].name);
        search += food 
        if (i < 4){
           search += ", "
        }
    })
    return search;
    
}

const Dashboard = (props) => {

    const username = useSelector(state => state.UserData.username);
    const expireData = useSelector(state => state.PantryData.ingredients);

    return (
        <Layout >
            <HomeBar name='Dashboard' navigation={props.navigation} />
                <Text style={{paddingLeft: '24px', paddingBottom: '16px', borderBottom: '5px solid royalblue'}} category='h1'>Hello, {username}!</Text>
            <React.Fragment >
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderExpire}>
                {
                    AboutToExpire(expireData)
                }
                </Card>
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderFavorite}>
                {
                   Favorites(expireData)
                }
                </Card>
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderRecipe}>
                {
                    <Text style={{fontSize: '22px'}}>{Recommended(expireData)}</Text>
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