import * as React from 'react';
import { View, ScrollView, Linking, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import HomeBar from './HomeBar';
import Header from '../modules/Header';



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
              <Input placeholder="Ingredient" value={this.state.queryStr} onChangeText={(text) => {this.setState({queryStr: text})}} />
              <Button onPress={() => { this.getJson()}}>Search</Button>
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
                      <Layout>
                        <Text>
                          {item.title.trim()}
                        </Text>
                        <Image resizeMode="cover"
                          source={{ uri: item.thumbnail }}>
                        </Image>
                        <Text>Ingredients: {item.ingredients}</Text>
                        <Text style={{color: 'blue'}}
                            onPress={() => Linking.openURL(item.href)}>
                          {item.href}
                        </Text>
                        <Button onPress={() => {
                          this.setState({selected: item.title});
                          this.scrapeRecipe(item.href);
                        }}>Open</Button>
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
