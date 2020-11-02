import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import HomeBar from './HomeBar';

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
  <View {...props} >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Text category='h1'>Grocery List</Text>
      <div style={{display: 'flex'}}>
        <Button style={{paddingBottom: '15px', marginLeft: '15px'  }} title="Add an Item"  onPress={() => { }}>
          Add an Item
        </Button>
        <Button style={{paddingBottom: '15px', marginLeft: '15px'  }} title="Update an Item"  onPress={() => { }}>
          Update an Item
        </Button>
        <Button style={{paddingBottom: '15px', marginLeft: '15px'  }} title="Remove an Item"  onPress={() => { }}>
          Remove an Item
        </Button>
      </div>
    </div>
  </View>
);

export default class GroceryList extends React.Component {

  render(){
    return(
      <Layout>
        <HomeBar name='Groceries' navigation={this.props.navigation}/>
        <React.Fragment>
          <Card style={styles.card} header={Header}>
          {
            list.map((u) => {
                return (
                  <ul style={{margin: '0', padding: '0',  listStyle: "circle"}}>
                    <li style={{width: '100%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{fontSize: '22px', display: 'flex'}}>{u.name}:</div>
                      <div style={{fontSize: '22px', display: 'flex'}}>{u.subtitle}</div>
                    </div>
                    </li>
                  </ul>
                  );
            })
          }
          </Card>
        </React.Fragment>

    </Layout>
    )
  }

};

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
