import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Layout, Text, Card, Button, ListItem, List } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import { connect, useSelector } from 'react-redux';

const Header = (props) => (
  <View {...props} >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Text category='h1'>Your Pantry</Text>
      <div style={{display: 'flex'}}>
      <Button style={{paddingBottom: '15px', marginLeft: '10px'  }} title="Add an Item"  onPress={() => { }}>
        Add an Item
      </Button>
      <Button style={{paddingBottom: '15px', marginLeft: '10px'  }} title="Update an Item"  onPress={() => { }}>
        Update an Item
      </Button>
      <Button style={{paddingBottom: '15px', marginLeft: '10px'  }} title="Remove an Item"  onPress={() => { }}>
        Remove an Item
      </Button>
      </div>
    </div>
  </View>
);

const Pantry = (props) => {

  const ingredients = useSelector(state => state.PantryData.ingredients);

  const renderItem = ({ item, index }) => (
    <View style={{alignSelf: 'stretch'}}>
      <Card style={styles.card}
      header={(headerProps) => {   
        return(
          <Text style={styles.margin} category='h6'>
          {item.name}
          </Text>
        )  

      }}
      >
        <Text style={styles.margin}>
          {<Text style={styles.margin}>{`Amount: ${item.amount} ${item.unit}\tExpires: ${item.expiration}`}</Text>}
        </Text>
      </Card>
    </View>
  );

  return(
    <Layout>
      <HomeBar name='Pantry' navigation={props.navigation}/>
      <React.Fragment>
        <Card style={styles.card} header={Header}>
        {
          <List
            data={ingredients}
            renderItem={renderItem}
          />
        }
        </Card>
      </React.Fragment>
    </Layout>
  )

}


export default connect()(Pantry);

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
  margin: {
    margin: 2,
  },
});
