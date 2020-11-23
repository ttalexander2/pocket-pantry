import * as React from 'react';
import { View, ScrollView, Linking, StyleSheet, ActivityIndicator  } from "react-native";
import { Text, ThemeProvider, Input, Button,  Card, Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import HomeBar from './HomeBar';



export default class Cookbook extends React.Component{
  state = {
    recipeResults: {"results": []},
    recipeContent: {},
    queryStr: "",
    selected: null,
    data: ['SELECTED','NOT SELECTED']
  }

  renderJson = () => {
    let comp = []

    
    return(comp)
  }



  render() {
    return (
      <ThemeProvider>
          <HomeBar name='Cookbook' />
            <View>
              <Input placeholder="Ingredient" onChangeText={(text) => {this.setState({queryStr: text})}} />
              <Button title="Search" onPress={() => { this.getJson()}}/>
            </View>
            <View style={styles.fixed}>
                    {
                      this.state.selected != null
                      &&
                      <Card style={{width: '50%'}}>
                        <Card.Title>
                          {this.state.selected.trim()}
                        </Card.Title>
                        <Card.Divider/>
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
                            <Text h4>
                            {
                            this.state.recipeContent.hasOwnProperty('yield')
                            &&
                            this.state.recipeContent.yield
                            }
                            </Text>
                            <Text h3>
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
                            <Text h3>
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
                      <Card>
                      <Card.Title>
                        {item.title.trim()}
                      </Card.Title>
                      <Card.Divider/>
                      <Image resizeMode="cover"
                        source={{ uri: item.thumbnail }}>
                      </Image>
                      <Text>Ingredients: {item.ingredients}</Text>
                      <Text style={{color: 'blue'}}>
                        {item.href}
                      </Text>
                      <Button title="Open" onPress={() => {
                        this.setState({selected: item.title});
                        this.scrapeRecipe(item.href);
                      }}/>
                    </Card>
                    )
                  })
                }
                </View>
              </View>
            </ScrollView>
      </ThemeProvider>
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
    top: 140,
    display: 'flex',
    alignItems: 'stretch',
    width: '50%',
    height: '100%'

  }
})
