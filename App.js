import * as React from 'react';
import {useState, useEffect} from 'react';
import { Text, Button, View, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home_screen.js';
import { ResultsScreen } from './results_screen.js';
import Quiz from './quiz.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Onboarding.js';
import { RandomTest } from './random_test.js';
import { openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-2';
import RNRestart from 'react-native-restart';
import NetInfo from "@react-native-community/netinfo";



const Drawer = createDrawerNavigator();
 
const CustomDrawer = (props) => {
  return <DrawerContentScrollView {...props}>
    <Text style={{fontSize: 25, fontStyle: "italic", textAlign: "center"}}>Quiz App</Text>
    <Image source = {require('./quizlogo.png')} style={{width: 200, height: 200, alignSelf: "center", marginVertical: 20}}/>
    <DrawerItemList {...props}/>
    <Button title='Get Latest Tests' onPress={() => {RNRestart.Restart()}}/>
  </DrawerContentScrollView>
}

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size="large"/>
  </View>

    );
  };

  ////////////////////////////
const DrawerNavigator = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [json, setJson] = useState([]);
  const _ = require("lodash");

  const getTests = async () => {
     try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const json = await response.json();
      setJson(json)
      //console.log(json[0])
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
  <Drawer.Navigator
  screenOptions={{
    drawerStyle: {
      backgroundColor: '#dcdcdc'
    },
    drawerItemStyle: {
      backgroundColor: "#d3d3d3",
      marginVertical: 5
    },
    
  }}
   drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Home Page" component={HomeScreen}/>
    <Drawer.Screen name="Results" component={ResultsScreen} />
    <Drawer.Screen name="Random Test" component={RandomTest} />
    {
      data.map(que => (
        <Drawer.Screen name={que.name} component={Quiz} />
      ))
    }
    
  </Drawer.Navigator>
);
}
//////////////////////
 

export default function App() {

  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  
 
  const checkOnboarding = async () => {
    try{

      const value = await AsyncStorage.getItem('@viewedOnboarding');

      if(value !== null){
        setViewedOnboarding(true)
      }

    } catch (err){
        console.log('Error @checkOnboarding: ', err)
    } finally {
      setLoading(false)
    }
  } 

  useEffect(() => {
    checkOnboarding();
    
  }, []); 

  return (
    <NavigationContainer>
     {loading ? <Loading/> : viewedOnboarding ? <DrawerNavigator/> : <Onboarding />}
    </NavigationContainer>
    
  );
}