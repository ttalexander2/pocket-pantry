import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Text, List, Button, Input, Datepicker } from '@ui-kitten/components';
import BackBar from './BackBar';
import { connect, useSelector } from 'react-redux';



const NewItem = (props) => {

    const editingItem = useSelector(state => state.GroceryListEditData.item);
    const validItems = useSelector(state => state.GroceryListEditData.valid);
    const editing = useSelector(state => state.GroceryListEditData.editing);
    const token = useSelector(state => state.UserData.token);

    return (
        <Layout >
            <BackBar name='Edit an Item' return={props.return} />
              <React.Fragment>
                <Card style={styles.card} header={() => {
                  return(<Text category='h3' style={{margin: 10}}>New Item</Text>)
                }}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
                    <View>
                      <Text category='h6' style={styles.input}>Name</Text>
                      <Text category='h6' style={styles.input}>Amount</Text>
                      <Text category='h6' style={styles.input}>Units</Text>
                    </View>
                    <View>
                      <Input placeholder='Name'
                        value={editingItem.name}
                        status={validItems.name}
                        onChangeText={value => {props.dispatch({type: 'SET_GROCERY_EDIT_NAME', name:value});}}                    
                      />
                      <Input placeholder='Amount'
                        value={editingItem.amount}
                        status={validItems.amount}
                        onChangeText={value => {props.dispatch({type: 'SET_GROCERY_EDIT_AMOUNT', amount:value});}} 
                      />
                      <Input placeholder='Units'
                        value={editingItem.unitOfAmount}
                        status={validItems.unitOfAmount}
                        onChangeText={value => {props.dispatch({type: 'SET_GROCERY_EDIT_UNIT', unitOfAmount:value});}} 
                        
                      />
                    </View>
                  </View>
                  <Button
                  onPress ={() => {
                    let valid = true;
                    if (!editingItem.name){
                      valid = false;
                    }
                    if (!editingItem.amount || Number.isNaN(Number.parseFloat(editingItem.amount))) {
                      valid = false;
                    }
                    else {
                      props.dispatch({type: 'SET_GROCERY_EDIT_AMOUNT', amount:Number.parseFloat(editingItem.amount)});
                    }
                    if (!editingItem.unitOfAmount){
                      valid = false;
                    }

                    if (!valid){
                      console.log('invalid')
                      return;
                    }

                    let data = {
                      token: token,
                      id: editingItem.id,
                      name: editingItem.name,
                      amount: editingItem.amount,
                      unitOfAmount: editingItem.unitOfAmount,
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
                    
                    if (editing){
                      console.log('aaaa')
                      fetch("https://pocketpantry.app/api/update/grocery", requestOptions)
                      .then((response) => {
                          if (response.status === 200) {
                            fetch("https://pocketpantry.app/api/userdata", requestOptions)
                                .then((response2) => {
                                  console.log('fetched again')
                                  response2.json().then((jsonResult) => {
                                        props.dispatch({type: 'SET_GROCERY_ACTIVE', active:false});
                                        props.dispatch({type: 'RESET_GROCERY_EDIT_ITEM'});
                                        props.dispatch({type: 'SET_GROCERYLIST_DATA', groceryList:jsonResult.grocery});
                                    });
                                })
                                .then(result => {})
                                .catch(error => console.log('error', error))
                          }
                      })
                      .then(result => {})
                      .catch(error => console.log('error', error))
                    }
                    else {
                      console.log('bbbb')
                      fetch("https://pocketpantry.app/api/add/grocery", requestOptions)
                      .then((response) => {
                          if (response.status === 200) {
                            fetch("https://pocketpantry.app/api/userdata", requestOptions)
                                .then((response2) => {
                                  console.log('fetched again')
                                  response2.json().then((jsonResult) => {
                                        props.dispatch({type: 'SET_GROCERY_ACTIVE', active:false});
                                        props.dispatch({type: 'RESET_GROCERY_EDIT_ITEM'});
                                        props.dispatch({type: 'SET_GROCERYLIST_DATA', groceryList:jsonResult.grocery});
                                    });
                                })
                                .then(result => {})
                                .catch(error => console.log('error', error))
                          }
                      })
                      .then(result => {})
                      .catch(error => console.log('error', error))
                    }
          

                  }
                }
                  >
                    Submit
                  </Button>
                </Card>
              </React.Fragment>
            </Layout>
    );
};

export default connect()(NewItem);


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
    input: {
      margin: 10
    }
  });