import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import {Header} from 'react-native-elements';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import dictionary from './database.js'

getWord=(word)=>{
  var searchKeyword = word.toLowerCase();
  var url = 'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + ".json"
  return fetch(url).then((data)=>{
    if(data.status === 200){
      return data.json();
    }
    else{
      return null
    }
  })
  .then((response)=>{
    var responseObject = response
    if(responseObject){
      var wordData = responseObject.definations[0]

      var defination = wordData.description
      var lexicalCategory = wordData.wordtype

      this.setState({
        "word" : this.state.text,
        "defination": defination,
        "lexicalCategory" : lexicalCategory
      })
    }else{
      this.setState({
        "word" : this.state.text,
        "defination": "Not Found"
      })
    }
  })
}

export default class HomeScreen extends Component {
  render(){
  return (
    <View style={styles.container}>
      <TextInput style = {styles.textInput}
      onChangeText = {text => {
        this.setState({
          text : text,
          isSearchPressed : false,
          word : "Loading...",
          lexicalCategory : '',
          examples : '',
          defination : ""
        })
      }}
      value={this.state.text}
      />
      <TouchableOpacity style = {styles.searchButton} 
      onPress={()=> {
          this.setState({isSearchPressed : true});
          this.getWord(this.state.text)
      }} ></TouchableOpacity>

        <View style = {styles.detailsContainer}>
        <Text style = {styles.detailsText}>Word : {""}</Text>
        <Text style = {styles.detailsText}> {this.state.word} </Text>
        </View>

        <View style = {styles.detailsContainer}>
        <Text style = {styles.detailsText}>Type : {""}</Text>
        <Text style = {styles.detailsText}> {this.state.lexicalCategory} </Text>
        </View>

        <View style = {styles.detailsContainer}>
        <Text style = {styles.detailsText}>Defination : {""}</Text>
        <Text style = {styles.detailsText}> {this.state.defination} </Text>
        </View>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    marginTop: 200,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    outline: 'none',
  },
  searchButton:{
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  detailsText:{
    textAlign: 'center',
    fontSize: 30,
  },
  detailsContainer:{
    justifyContent : 'center',
    alignItems : 'center',
    margin : 4,
    backgroundColor : 'pink',
    marginLeft : 100
  }
});
