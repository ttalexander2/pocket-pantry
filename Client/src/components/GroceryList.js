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
import { connect, useSelector } from 'react-redux';

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

const Header = (props) => (
  <View {...props}>
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 15}}>
      <Text category='h1'>Grocery List</Text>
      <div style={{display: 'flex'}}>
      <Button style={{paddingBottom: '15px', marginLeft: '10px'  }} onPress={() => { }}
        appearance='outline'
        accessoryLeft={renderAddIcon}
        onPress={() => props.dispatch({type: 'SET_EDITING', editing:true})}
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


  const renderItem = ({ item, index }) => (
    <View>
      <ListItem
      >
      <View appearance='outline' style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginLeft: 5, marginRight: 5, justifyContent: 'center',
      alignItems: 'center' }}>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {item.name}
        </Text>

        <Button style={styles.icon} appearance='outline'
        accessoryLeft={renderEditIcon}
        />
        <Button style={styles.icon} appearance='outline'
        accessoryLeft={renderDeleteIcon}
        />
      </View>
      </ListItem>

    </View>

  );


    return(
      <Layout>
      <HomeBar name='Grocery List' navigation={props.navigation} style={styles.homebar}/>
      <React.Fragment>
        <Card style={styles.card} header={(headerProps) => {return(Header(props))}}>

          <List
            data={list}
            renderItem={renderItem}
          />

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
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
