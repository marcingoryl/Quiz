import React, { Component, useEffect, useState } from 'react';
import { Text, View, Button, StatusBar , StyleSheet, SafeAreaView, RefreshControl, ActivityIndicator} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export function ResultsScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  

  const [refreshing, setRefreshing] = React.useState(false);

  const getResults = async () => {
    try {
     const response = await fetch('https://tgryl.pl/quiz/results');
     const json = await response.json();
     setData(json);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 useEffect(() => {
   getResults();
 }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
    <Text style={styles.title}>{item.nick}</Text>
    <Text style={styles.element}>Score: {item.score}</Text>
    <Text style={styles.element}>Total: {item.total}</Text>
    <Text style={styles.element}>Type: {item.type}</Text>
    <Text style={styles.element}>Date: {item.createdOn}</Text>
  </View>
    
  );

    return (
      <SafeAreaView style={styles.container}>
         {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
         )}
    </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#DDDDDD',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 25,
      fontFamily: "BakbakOne-Regular"
    },
    element: {
      fontSize: 18,
      fontFamily: "Poppins-ExtraLightItalic"
    },
  });