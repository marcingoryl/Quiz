import React, { Component, useState, useEffect } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function HomeScreen({navigation}) {

   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);

   const getTests = async () => {
      try {
       const response = await fetch('https://tgryl.pl/quiz/tests');
       const json = await response.json();
       setData(json);
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   }
  
   useEffect(() => {
     getTests();
   }, []);

      return (
         <View>
            <ScrollView>
               {
                  data.map(que => (
                     <TouchableOpacity onPress={() => navigation.navigate(que.name, {link: que.id, tgs: que.tags[0]})}>
                     <View key = {que.id} style = {styles.item}>
                        <Text style = {{fontSize: 25, fontFamily: "BakbakOne-Regular"}}>{que.name}</Text>
                        <Text style = {{marginVertical: 10, color: "#2986cc"}}>{que.tags.map(tg => <Text>#{tg} </Text>)}</Text>
                        <Text>{que.description}</Text>
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
      borderColor: "black",
   },
   text: {
      fontSize: 20,
      textAlign: "center",
      fontFamily: "BakbakOne-Regular"
      
   }
})


