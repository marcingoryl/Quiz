import React, { Component, useState, useEffect } from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-2'
import NetInfo from "@react-native-community/netinfo";


export function RandomTest({navigation}) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const _ = require("lodash");
 
    const getTests = async () => {
        try {
         const response = await fetch('https://tgryl.pl/quiz/tests');
         const json = await response.json();
         setData(_.shuffle(json));
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }

     useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected){
               getTests()
               
            }else 
            {
               console.log("Brak połączenia z Internetem.")
            }
        
        });
         
        
       }, []);
 
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#dcdcdc' }}>
            <Text style={{fontSize: 50, marginBottom: 100}}>Get Ready</Text>
                <Button onPress={() => navigation.navigate(data[0].name, {link: data[0].id, tgs: data[0].tags[0]})} title="BEGIN TEST" />
        </View>
      );

}