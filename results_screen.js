import React, { Component } from 'react';
import { Text, View, Button, StatusBar , StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const restults = [
  {
    "nick": "Marcin",
    "score": 3,
    "total": 3,
    "type": "wiedza ogólna",
    "date": "2021-12-07"
  },
 /* {
    "nick": "Jarek",
    "score": 12,
    "total": 20,
    "type": "biologia",
    "date": "2019-11-22"
  },
  {
    "nick": "Darek",
    "score": 19,
    "total": 20,
    "type": "matematyka",
    "date": "2019-10-21"
  } */
];

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export function ResultsScreen({ navigation }) {

  const [refreshing, setRefreshing] = React.useState(false);

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
    <Text style={styles.element}>Date: {item.date}</Text>
  </View>
    
  );

    return (
      <SafeAreaView style={styles.container}>
        
      <FlatList
        data={restults}
        renderItem={renderItem}
        keyExtractor={item => item.score}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      
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
    },
    element: {
      fontSize: 18
    },
  });