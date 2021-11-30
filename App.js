import * as React from 'react';
import { Text, Button, View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './home_screen.js';


 function ResultsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ekran wyników, który w przyszłości będzie zawierał informacje o wynikach graczy.</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function TestScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tutaj znajdzie się logika umoliwiająca rozwiązanie quizu.</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return <DrawerContentScrollView {...props}>
    <Text style={{fontSize: 25, fontStyle: "italic", textAlign: "center"}}>Quiz App</Text>
    <Image source = {require('./quizlogo.png')} style={{width: 200, height: 200, alignSelf: "center", marginVertical: 20}}/>
    <DrawerItemList {...props}/>
  </DrawerContentScrollView>
}

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
    
    <Drawer.Screen name="Title test #1" component={TestScreen} />
    <Drawer.Screen name="Title test #2" component={TestScreen} />
    <Drawer.Screen name="Title test #3" component={TestScreen} />
    <Drawer.Screen name="Title test #4" component={TestScreen} />
  </Drawer.Navigator>
);
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
    
  );
}


