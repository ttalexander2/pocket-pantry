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
      <Layout style={styles.container}>
          <HomeBar name='Cookbook' />
            <View>
              <Input placeholder="Ingredient" onChangeText={(text) => {this.setState({queryStr: text})}} />
              <Button onPress={() => { this.getJson()}}>Search</Button>
            </View>
            <View style={styles.fixed}>
                    {
                      this.state.selected != null
                      &&
                      <Card style={{width: '50%'}}
                      header={<Header title={this.state.selected.trim()} />}
                      >
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
                      </Card>
                    }    
            </View>
            <ScrollView>
              <View style={styles.container} >
                <View style={styles.item}>
                {
                  this.state.recipeResults.results.map((item) => {
                    return(
                      <Card
                      header={<Header title={item.title.trim()} />}
                      >
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
                    </Card>
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

    fetch("http://localhost:42069/api/recipes", requestOptions)
      .then(response => response.text())
      .then(result => this.setState({recipeResults: JSON.parse(result)}))
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

    fetch("http://localhost:42069/api/recipes/scrape", requestOptions)
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    left: '50%',
    width: '50%', // is 50% of container width
  },
  fixed: {
    position: 'absolute',
    left: 0,
    top: 139,
    display: 'flex',
    alignItems: 'stretch',
    width: '50%',
    height: '100%'

  }
})
