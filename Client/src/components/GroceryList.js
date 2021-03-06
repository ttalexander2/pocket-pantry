/*
This file holds the information for the grocery list page. This page functions
similarly to the pantry page but it is a grocery list, so it is made up of items
that the user likely does not already have. Like the pantry, you are able to add
and remove items and those items stay stored on your account
*/

import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Layout, Text, Card, Button, ListItem, List, Icon } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import NewItem from './NewGroceryItem';
import { connect, useSelector } from 'react-redux';

const Header = (props) => (
  <View {...props}>
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 15}}>
      <Text category='h1'>Your Grocery List</Text>
      <div style={{display: 'flex'}}>
      <Button style={{paddingBottom: '15px', marginLeft: '10px'  }} onPress={() => { }}
        appearance='outline'
        accessoryLeft={renderAddIcon}
        onPress={() => {props.dispatch({type: 'SET_GROCERY_ACTIVE', active:true}); props.dispatch({type: 'SET_GROCERY_EDITING', edit:false});}}
      />

      </div>
    </div>
  </View>
);

const renderAddIcon = (props) => (
  <Icon {...props}
  name='plus-outline'
  />
);

const GroceryList = (props) => {

  const groceryList = useSelector(state => state.GroceryListData.groceryList);
  const active = useSelector(state => state.GroceryListEditData.active);
  const token = useSelector(state => state.UserData.token);

  const renderDeleteIcon = (props) => (
    <Icon {...props}
    name='trash-2-outline'
    />
  );

  const renderEditIcon = (props) => (
    <Icon {...props}
    name='edit-outline'
    />
  );

  const renderItem = (renderProps, props, token) => {

    let item = renderProps.item;
    let index = renderProps.index;

    if (item == undefined || item == null){
      return;
    }

    return(

    <View>
      <ListItem>
      <View appearance='outline' style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'center',
      alignItems: 'center' }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {item.name}
        </Text>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {`${item.amount} ${item.unitOfAmount}`}
        </Text>

        <Button style={styles.icon} appearance='outline'
        accessoryLeft={renderEditIcon}
        onPress={() =>{ 
          props.dispatch({type: 'SET_GROCERY_EDIT_ITEM', item: {
            id: item.id,
            name: item.name, 
            amount: item.amount,
            unitOfAmount: item.unitOfAmount,
          }});
          props.dispatch({type: 'SET_GROCERY_EDITING', editing:true});
          props.dispatch({type: 'SET_GROCERY_ACTIVE', active:true});
        }}
        />
        <Button style={styles.icon} appearance='outline'
        accessoryLeft={renderDeleteIcon}
        onPress={() => {

          let data = {
            token: token,
            id: item.id
          }

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append('Access-Control-Allow-Origin', '*');

          let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
          };


          fetch("https://pocketpantry.app/api/delete/grocery", requestOptions)
          .then((response) => {
              if (response.status === 200) {
                fetch("https://pocketpantry.app/api/userdata", requestOptions)
                    .then((response2) => {
                      response2.json().then((jsonResult) => {
                            props.dispatch({type: 'SET_GROCERYLIST_DATA', groceryList:jsonResult.grocery});
                        });
                    })
                    .then(result => {})
                    .catch(error => console.log('error', error))
              }
          })
          .then(result => {})
          .catch(error => console.log('error', error))
        }}
        />
      </View>
      </ListItem>

    </View>
    );
  };

  return(
    active
    ?
    <NewItem name='Add an item' {...props} return={() => {props.dispatch({type: 'SET_GROCERY_ACTIVE', active:false}); props.dispatch({type: 'RESET_GROCERY_EDIT_ITEM'})}}/>
    :
    <Layout>
      <HomeBar name='GroceryList' style={styles.homebar} navigation={props.navigation}/>
      <React.Fragment>
        <Card style={styles.card} header={(headerProps) => {return Header(props)}}>
        {
          <View>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginLeft: 12, marginRight: 36, justifyContent: 'center',
              alignItems: 'center' }}>
            <Text category='h6' style={{ flex: 1, alignSelf: 'center' }}>
              Food
            </Text>
            <Text category='h6' style={{ flex: 1, alignSelf: 'center' }}>
              Amount
            </Text>
            <View style={styles.emptyIcon} />
            <View style={styles.emptyIcon} />
          </View>
          <List
            data={groceryList}
            renderItem={(renderProps) => {return renderItem(renderProps, props, token);}}
          />        
          </View>

        }
        </Card>
      </React.Fragment>
    </Layout>
  )

}


export default connect()(GroceryList);

/*===========================Styles================================*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  homebar: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    
  },
  icon: {
    width: 16,
    height: 16,
    margin: 2

  },
  emptyIcon: {
    padding: 16
  }
});
