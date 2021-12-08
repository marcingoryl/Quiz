import * as React from 'react';
import {useState, useEffect} from 'react';
import { Text, Button, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home_screen.js';
import { ResultsScreen } from './results_screen.js';
import Quiz from './quiz.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Onboarding.js';


const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return <DrawerContentScrollView {...props}>
    <Text style={{fontSize: 25, fontStyle: "italic", textAlign: "center"}}>Quiz App</Text>
    <Image source = {require('./quizlogo.png')} style={{width: 200, height: 200, alignSelf: "center", marginVertical: 20}}/>
    <DrawerItemList {...props}/>
  </DrawerContentScrollView>
}

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size="large"/>
  </View>

    );
  };

const DrawerNavigator = () => {
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
    
    <Drawer.Screen name="Title test #1" component={Quiz} />
    <Drawer.Screen name="Title test #2" component={Quiz} />
    <Drawer.Screen name="Title test #3" component={Quiz} />
    <Drawer.Screen name="Title test #4" component={Quiz} />
    
  </Drawer.Navigator>
);
}


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