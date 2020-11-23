import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Text, List, ListItem } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import jwtDecode from 'jwt-decode';
import * as jwt from '../JWT';
import { connect, useSelector } from 'react-redux';

export var foodExpire = [{name: 'sushi', date: 'xx/xx'}, {name: 'nigiri', date: 'xx/xx'}, {name: 'ramen', date: 'xx/xx'}, {name: 'tempura', date: 'xx/xx'}]
export var foodFavorite = [{name: 'sushi'}, {name: 'ramen'}]
export var foodRecipe = [{name: 'sushi'}]


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
    <Text category='h3'>Your Food Favorites...</Text>
    </div>
</View>
);
const HeaderRecipe = (props) => (
<View {...props} >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Text category='h3'>Recommended Recipes...</Text>
    </div>
</View>
);



const Dashboard = (props) => {

    const username = useSelector(state => state.UserInfo.username);

    return (
        <Layout >
            <HomeBar name='Dashboard' navigation={props.navigation} />
                <Text style={{paddingLeft: '24px', paddingBottom: '16px', borderBottom: '5px solid royalblue'}} category='h1'>Hello, {username}!</Text>
            <React.Fragment >
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderExpire}>
                {
                    foodExpire.map((e) => {
                        return (
                        <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                            <li style={{float: 'left', display: "inline-block"}}>
                            <Text style={{fontSize: '22px'}}>{e.name}: {e.date}</Text>
                            </li>
                        </ul>
                        );
                    })
                }
                </Card>
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderFavorite}>
                {
                    foodFavorite.map((f) => {
                        return (
                        <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                            <li style={{float: 'left', display: "inline-block"}}>
                            <Text style={{fontSize: '22px'}}>{f.name}: {f.date}</Text>
                            </li>
                        </ul>
                        );
                    })
                }
                </Card>
                <Card style={styles.card, {width: '90%', margin: 'auto', marginTop: '15px', marginBottom: '15px'}} header={HeaderRecipe}>
                {
                    foodRecipe.map((r) => {
                        return (
                        <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                            <li style={{float: 'left', display: "inline-block"}}>
                            <Text style={{fontSize: '22px'}}>{r.name}: {r.date}</Text>
                            </li>
                        </ul>
                        );
                    })
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