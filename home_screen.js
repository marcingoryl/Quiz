import React, { Component, useState, useEffect } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-2'
import NetInfo from "@react-native-community/netinfo";



export function HomeScreen({navigation}) {

   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
   const[json, setJson] = useState([]);
   const _ = require("lodash");

   const getTests = async () => {
      try {
       const response = await fetch('https://tgryl.pl/quiz/tests');
       const json = await response.json();
       setJson(json)
       setData(_.shuffle(json));
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   }

   const saveToDB = () => {
      const db = SQLite.openDatabase('test.db', '1.0', '', 1)

      db.transaction(function(txn) {
         txn.executeSql('DROP TABLE IF EXISTS Tests', [])
         txn.executeSql(
           'CREATE TABLE IF NOT EXISTS Tests(id TEXT)',
           []
     )

     txn.executeSql('INSERT INTO Tests (id) VALUES (:id)', [JSON.stringify(json)])

         })
   }

   const getQueFromDB = () => {
      const db = SQLite.openDatabase('md.db', '1.0', '', 1)
      db.transaction(function(txn) {
         const query = 'SELECT * FROM `tests`';
         txn.executeSql(query, [], function(tx, res) {
           const x = res.rows.item(0).id
           console.log(JSON.parse(x)[0])
           setData(JSON.parse(x))
           })

      })
   }

   useEffect(() => {
      NetInfo.fetch().then(state => {
        if(state.isConnected){
           getTests()
           saveToDB()
        }else 
        {
           getQueFromDB()
           console.log("Brak połączenia z Internetem.")
        }
  
});
     
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


