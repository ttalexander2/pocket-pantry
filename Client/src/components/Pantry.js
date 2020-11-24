import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Layout, Text, Card, Button, ListItem, List, Icon } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import NewItem from './NewItem';
import { connect, useSelector } from 'react-redux';

const Header = (props) => (
  <View {...props}>
    <div style={{display: 'flex', justifyContent: 'space-between', margin: 15}}>
      <Text category='h1'>Your Pantry</Text>
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

const Pantry = (props) => {

  const ingredients = useSelector(state => state.PantryData.ingredients);
  const editing = useSelector(state => state.PantryEditData.editing);

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
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {item.brand}
        </Text>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {`${item.amount} ${item.unitofamount}`}
        </Text>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {item.expirationdate.toDateString()}
        </Text>
        <Text style={{ flex: 1, alignSelf: 'center' }}>
          {item.dateofpurchase.toDateString()}
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
    editing
    ?
    <NewItem name='Add an item' return={() => {props.dispatch({type: 'SET_EDITING', editing:false}); props.dispatch({type: 'RESET_EDIT_ITEM'})}}/>
    :
    <Layout>
      <HomeBar name='Pantry' style={styles.homebar} navigation={props.navigation}/>
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
              Brand
            </Text>
            <Text category='h6' style={{ flex: 1, alignSelf: 'center' }}>
              Amount
            </Text>
            <Text category='h6' style={{ flex: 1, alignSelf: 'center' }}>
              Expiration
            </Text>
            <Text category='h6' style={{ flex: 1, alignSelf: 'center' }}>
              Purchase
            </Text>
            <View style={styles.emptyIcon} />
            <View style={styles.emptyIcon} />
          </View>
          <List
            data={ingredients}
            renderItem={renderItem}
          />        
          </View>

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
