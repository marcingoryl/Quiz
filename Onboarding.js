import React, { useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';




const Onboarding = ({navigation}) => {
  
    onPress = async () => {
        try{
          
              await AsyncStorage.setItem('@viewedOnboarding', 'true');
              RNRestart.Restart();
        }catch (err){
  
        }
    }

    return (
      
      <View>
        <Text style={styles.titleText}>
          Regulamin Aplikacji
          {"\n"}
        </Text>
        <Text style={styles.baseText}> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f
            ugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
        <View style={styles.buttonView}>
            <Button title="AKCJEPTUJĘ" onPress={onPress}/>
        </View>
        </View>
         
    );
  };

  

  
    
  
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin",
      marginTop: 20,
      textAlign: "left",
      fontSize: 20,
      marginHorizontal: 10
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 80,
      textAlign: "center",
      fontFamily: "Cochin",
      fontSize: 30
    },
    buttonView: {
        alignItems: "center",
        marginTop: 50
    }
  });
  
  export default Onboarding;