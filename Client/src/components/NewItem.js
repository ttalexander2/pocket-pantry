import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Card, Text, List, Button, Input, Datepicker } from '@ui-kitten/components';
import BackBar from './BackBar';
import { connect, useSelector } from 'react-redux';



const NewItem = (props) => {

    const editingItem = useSelector(state => state.PantryEditData.item);

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
                      <Input placeholder='Name'/>
                      <Input placeholder='Brand'/>
                      <Input placeholder='Amount'/>
                      <Input placeholder='Units'/>
                      <Datepicker
                        date={editingItem.expirationdate}
                        onSelect={nextDate => {}}
                      />
                      <Datepicker
                        date={editingItem.dateofpurchase}
                        onSelect={nextDate => {}}
                      />
                    </View>
                  </View>
                  <Button>
                    Add Item!
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