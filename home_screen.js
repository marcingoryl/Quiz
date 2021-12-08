import React, { Component } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Onboarding.js';

export function HomeScreen({navigation}) {

   state = {
      questions: [
         {'title': "Title test #1", "tags": "#Tag1 #Tag2", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ligula malesuada orci tincidunt ultricies. Duis sit amet vestibulum ligula..."},
         {'title': "Title test #2", "tags": "#Tag1 #Tag2", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ligula malesuada orci tincidunt ultricies. Duis sit amet vestibulum ligula..."},
         {'title': "Title test #3", "tags": "#Tag1 #Tag2", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ligula malesuada orci tincidunt ultricies. Duis sit amet vestibulum ligula..."},
         {'title': "Title test #4", "tags": "#Tag1 #Tag2", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in ligula malesuada orci tincidunt ultricies. Duis sit amet vestibulum ligula..."}
      ]
   }

   
      return (
         <View>
            <ScrollView>
               {
                  this.state.questions.map((item, index) => (
                     <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
                     <View key = {item.title} style = {styles.item}>
                        <Text style = {{fontSize: 25}}>{item.title}</Text>
                        <Text style = {{marginVertical: 10, color: "#2986cc"}}>{item.tags}</Text>
                        <Text>{item.desc}</Text>
                     </View>
                     </TouchableOpacity>
                  ))
               }
                <View style = {styles.footer}>
                  <Text style = {styles.text} onPress={clearOnboarding}>Get to know your ranking result</Text>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={() => navigation.navigate('Results')}>
                     <Text style = {styles.text} >Check!</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
            
         </View>
      )
   }

export default HomeScreen

const clearOnboarding = async () => {
   try {
     await AsyncStorage.removeItem('@viewedOnboarding');
   } catch (err) {
 
   }
 }

const styles = StyleSheet.create ({
   item: {
      flexDirection: 'column',
      flexFlow: 'flex-start',
      alignItems: 'flex-start',
      padding: 30,
      marginVertical: 10,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      // backgroundColor: '#d2f7f1'
   },
   footer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 5
   },
   button: {
      marginVertical: 10,
      marginHorizontal: 50,
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderWidth: 1,
      borderColor: "black"
   },
   text: {
      fontSize: 20,
      textAlign: "center"
   }
})


