import * as React from 'react';
import { Text, View, ScrollView, Linking } from "react-native";
import { ThemeProvider, Input, Button,  Card, Image } from 'react-native-elements';
import HomeBar from './HomeBar';



export default class Cookbook extends React.Component{
  state = {
    recipeResults: {"results": []},
    queryStr: ""
  }

  renderJson = () => {
    let comp = []

    this.state.recipeResults.results.forEach(element => {
      comp.push(
        <Card>
            <Card.Title>
              {element.title.trim()}
            </Card.Title>
            <Card.Divider/>
            <Image resizeMode="cover"
              source={{ uri: element.thumbnail }}>
            </Image>
            <Text>Ingredients: {element.ingredients}</Text>
            <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(element.href)}>
            Source
          </Text>
        </Card>
      )
    });
    return(comp)
  }

  render() {
    return (
      <ThemeProvider>
          <HomeBar name='Cookbook' />
          <View>
            <View>
              <Input placeholder="Ingredient" onChangeText={(text) => {this.setState({queryStr: text})}} />
              <Button title="Search" onPress={() => { this.getJson()}}/>
            </View>
            <View>
              <ScrollView style={{flexDirection: 'row'}}>
                  {this.renderJson()}
              </ScrollView>
              <View style={{flexDirection: 'row'}}>
                <Text>Recipe will go here.</Text>
              </View>
            </View>

          </View>



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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  }
})
