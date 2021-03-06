/*
This file creates the component for creating a new item to be added to the pantry.
It has several fields for the user to to enter information about the item and
we verify that the information is present and in the correct form.
*/

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Text, List, Button, Input, Datepicker } from '@ui-kitten/components';
import BackBar from './BackBar';
import { connect, useSelector } from 'react-redux';



const NewItem = (props) => {

    const editingItem = useSelector(state => state.PantryEditData.item);
    const validItems = useSelector(state => state.PantryEditData.valid);
    const editing = useSelector(state => state.PantryEditData.editing);
    const token = useSelector(state => state.UserData.token);

    const now = new Date();
    const next = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());
    const prev = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());

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
                      <Text category='h6' style={styles.input} >Brand</Text>
                      <Text category='h6' style={styles.input}>Amount</Text>
                      <Text category='h6' style={styles.input}>Units</Text>
                      <Text category='h6' style={styles.input}>Expiration Date</Text>
                      <Text category='h6' style={styles.input}>Purchase Date</Text>
                    </View>
                    <View>
                      <Input placeholder='Name'
                        value={editingItem.name}
                        status={validItems.name}
                        onChangeText={value => {props.dispatch({type: 'SET_EDIT_NAME', name:value});}}
                      />
                      <Input placeholder='Brand'
                        value={editingItem.brand}
                        status={validItems.brand}
                        onChangeText={value => {props.dispatch({type: 'SET_EDIT_BRAND', brand:value});}}
                      />
                      <Input placeholder='Amount'
                        value={editingItem.amount}
                        status={validItems.amount}
                        onChangeText={value => {props.dispatch({type: 'SET_EDIT_AMOUNT', amount:value});}}
                      />
                      <Input placeholder='Units'
                        value={editingItem.unitOfAmount}
                        status={validItems.unitOfAmount}
                        onChangeText={value => {props.dispatch({type: 'SET_EDIT_UNIT', unitOfAmount:value});}}

                      />
                      <Datepicker
                        date={editingItem.expirationDate}
                        onSelect={nextDate => {props.dispatch({type: 'SET_EDIT_EXPIRATION', expirationDate:nextDate});}}
                        max={next}
                        min={prev}
                      />
                      <Datepicker
                        date={editingItem.dateOfPurchase}
                        onSelect={nextDate => {props.dispatch({type: 'SET_EDIT_PURCHASE', dateOfPurchase:nextDate});}}
                        max={next}
                        min={prev}
                      />
                    </View>
                  </View>
                  <Button
                  onPress ={() => {
                    let valid = true;
                    if (!editingItem.name){
                      valid = false;
                    }
                    if (!editingItem.brand){
                      valid = false;
                    }
                    if (!editingItem.amount || Number.isNaN(Number.parseFloat(editingItem.amount))) {
                      valid = false;
                    }
                    else {
                      props.dispatch({type: 'SET_EDIT_AMOUNT', amount:Number.parseFloat(editingItem.amount)});
                    }
                    if (!editingItem.unitOfAmount){
                      valid = false;
                    }

                    if (!valid){
                      return;
                    }

                    let data = {
                      token: token,
                      id: editingItem.id,
                      name: editingItem.name,
                      brand: editingItem.brand,
                      amount: editingItem.amount,
                      unitOfAmount: editingItem.unitOfAmount,
                      expirationDate: new Date(editingItem.expirationDate + 1),
                      dateOfPurchase: new Date(editingItem.dateOfPurchase),
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
                      fetch("https://pocketpantry.app/api/update/pantry", requestOptions)
                      .then((response) => {
                          if (response.status === 200) {
                            fetch("https://pocketpantry.app/api/userdata", requestOptions)
                                .then((response2) => {
                                  console.log('fetched again')
                                  response2.json().then((jsonResult) => {
                                        props.dispatch({type: 'SET_ACTIVE', active:false});
                                        props.dispatch({type: 'RESET_EDIT_ITEM'});
                                        props.dispatch({type: 'SET_INGREDIENT_DATA', ingredients:jsonResult.ingredients});
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
                      fetch("https://pocketpantry.app/api/add/pantry", requestOptions)
                      .then((response) => {
                          if (response.status === 200) {
                            fetch("https://pocketpantry.app/api/userdata", requestOptions)
                                .then((response2) => {
                                  console.log('fetched again')
                                  response2.json().then((jsonResult) => {
                                        props.dispatch({type: 'SET_ACTIVE', active:false});
                                        props.dispatch({type: 'RESET_EDIT_ITEM'});
                                        props.dispatch({type: 'SET_INGREDIENT_DATA', ingredients:jsonResult.ingredients});
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
