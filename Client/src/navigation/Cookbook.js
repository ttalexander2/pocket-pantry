import * as React from 'react';
import { View, ScrollView, Linking, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Layout, Text, Input, Button, Icon, List, ListItem, Card } from '@ui-kitten/components';
import HomeBar from './HomeBar';



export default class Cookbook extends React.Component{
  state = {
    recipeResults: {"results": []},
    recipeContent: {},
    queryStr: "",
    selected: null,
    data: ['SELECTED','NOT SELECTED']
  }



  render() {
    return (
      <Layout>
          <HomeBar name='Cookbook' navigation={this.props.navigation}/>
            <View>
            <Text style={{paddingLeft: '24px'}} category='h1'>Search for a Recipe</Text>
            <Text category='h6' style={{fontStyle: 'italic', paddingLeft: '24px' }}>Enter Ingredients Separated By Commas</Text>
              <Input style={{paddingLeft: '24px', paddingRight: '24px', backgroundColor: 'aliceblue'}}  placeholder="Noodles, Seaweed, Carrots, Onions, ..." value={this.state.queryStr} onChangeText={(text) => {this.setState({queryStr: text})}} />
              <Button style={{margin: '24px'}}  onPress={() => { this.getJson()}}>Search</Button>
            </View>
            <View style={styles.fixed}>
                    {
                      this.state.selected != null
                      &&
                      <Layout>
                        <Text>
                          {this.state.selected.trim()}
                        </Text>
                        <Text>
                          {
                          this.state.recipeContent.hasOwnProperty('title')
                          ?
                          <View>
                            {
                              this.state.recipeContent.hasOwnProperty('image')
                              &&
                              <Image 
                              source={{ uri: this.state.recipeContent.image }}
                              style={{ width: 200, height: 200 }}
                              PlaceholderContent={<ActivityIndicator/>}
                            />
                            }
                            <Text category='h4'>
                            {
                            this.state.recipeContent.hasOwnProperty('yield')
                            &&
                            this.state.recipeContent.yield
                            }
                            </Text>
                            <Text category='h3'>
                              Ingredients
                            </Text>
                            <View>
                            {
                              this.state.recipeContent.hasOwnProperty('ingredients')
                              &&
                              this.state.recipeContent.ingredients.map((item) => {
                                return(
                                  <Text>
                                    - {item}
                                  </Text>
                                )
                              })
                            }
                            </View>
                            <Text category='h3'>
                              Instructions
                            </Text>
                            <Text>
                              {
                                this.state.recipeContent.hasOwnProperty('instructions')
                                &&
                                this.state.recipeContent.instructions
                              }
                            </Text>
                          </View>
                          :
                          JSON.stringify(this.state.recipeContent)
                          }
                        </Text>
                      </Layout>
                    }    
            </View>
            <ScrollView>
              <View style={styles.container} >
                <View style={styles.item}>
                {
                  this.state.recipeResults.results.map((item) => {
                    return(
                      <Layout style={{display: 'flex', flexDirection: 'row', borderBottom: '3px solid royalblue', borderTop: '3px solid aliceblue', padding: '5px', margin: '5px'}}>
                        <Layout >
                          <Button style={{margin: '10px', marginTop: '20px'}} onPress={() => {
                            this.setState({selected: item.title});
                            this.scrapeRecipe(item.href);
                          }}>Open</Button>
                          </Layout>
                          <Layout>
                            <Text category='h3'>
                              {item.title.trim()}
                            </Text>
                            <Text category= 'h6' style={{fontStyle: 'italic'}}>Ingredients: {item.ingredients}</Text>
                            <Text style={{color: 'blue'}}
                                onPress={() => Linking.openURL(item.href)}>
                              {item.href}
                            </Text>
                            </Layout>
                      </Layout>
                    )
                  })
                }
                </View>
              </View>
            </ScrollView>
      </Layout>
    );
  }



  getJson(){

    const stuff = {
        ingredients: this.state.queryStr.split(', ')
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var raw = JSON.stringify(stuff);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://pocketpantry.app/api/recipes", requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          this.setState({recipeResults: JSON.parse(result)});
        } catch (e) {
          console.log(e)
        }
        
        })
      .catch(error => console.log('error', error));
 
  }

  scrapeRecipe(url){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');

    var raw = JSON.stringify({'url':url});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://pocketpantry.app/api/recipes/scrape", requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          this.setState({recipeContent: JSON.parse(result)});
          
        } catch (e) {
            this.setState({recipeContent: result})
        }
      })
      .catch(error => console.log('error', error));   
    }
}

const styles = StyleSheet.create({
  container: {

  },
  item: {

  },
  fixed: {

  }
})
