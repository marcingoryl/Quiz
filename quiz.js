import React, { Component, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';


const styles = StyleSheet.create({
  
  progress: {
    margin: 10,
    width: 350
  },
  textStyle: {
    marginTop: 50,
    fontSize: 20,
    marginStart: 15
  },
  numOfQuestTime: {
    flexDirection: "row"
  },
  timeStyle: {
    marginTop: 50,
    fontSize: 20,
    marginStart: 90,
  },
  questionStyle: {
      fontSize: 20,
      marginTop: 50,
      marginHorizontal: 15,
      textAlign: "center",
      fontFamily: "BakbakOne-Regular"
  },
  borderView: {
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 15
  },
  buttonStyle: {
    width: 350,
    
    justifyContent: "center",
    flexWrap: 'wrap',
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    marginVertical: 15,
    
    
  },
});



export default class Quiz extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ind: 0,
      userAns: "false",
      points: 0,
      timer: 30,
      progress: 0,
      indeterminate: true,
      data: [],
      isLoading: true,
      
    };
  } 

  onPress = (ind, isCorrect, points) => {
   
    if(isCorrect){
      points++
    }
       
    let i = ind;
    if(i < this.state.data.length-1){
        i++
        this.setState({
          ind: i
        })
    }
    else{
      this.setState({
        ind: 0
      })
      

      fetch('https://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        nick: 'Test',
        score: points,
        total: this.state.ind+1,
        type: this.props.route.params?.tgs
  })
});

  this.props.navigation.navigate('Results')
    } 
    
      this.setState({
          ind: i,
          isCorrect: "false",
          points: points,
          timer: 30,
          progress: 0,
        
      })
      console.log('punkty: ',points)
  }


  componentDidMount() {
    this.getQuestion();
   
    this.setState({ indeterminate: true });
    this.interval = setInterval(
        () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
        1000
      );
    this.animate();
    
  }
  
  componentDidUpdate(){
    if(this.state.timer === 0){ 
      clearInterval(this.interval);
      
    }
    
  }
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }

  animate() {
    
    let progress = 0;
    this.setState({ progress });
    
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += 0.033;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 1000);
    
  }

   async getQuestion() {
    try {
      const response = await fetch('https://tgryl.pl/quiz/test/'+ this.props.route.params?.link);
      const json = await response.json();
      this.setState({ data: json.tasks });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  } 

  

  render() {

    const { data, isLoading } = this.state;
    

    return (
      
        <View>
          
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
            {isLoading ? <ActivityIndicator/> : (
        <View style={styles.numOfQuestTime}>
          <Text style={styles.textStyle}>Question: {this.state.ind+1} of {data.length}</Text>
          <Text style = {styles.timeStyle}>Time: {this.state.timer} sec</Text>
        </View>
            )}
        <View style = {{alignItems: "center", marginTop: 50}}>
        <Progress.Bar
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
        </View>
        <Text style = {styles.questionStyle}>{data[this.state.ind]?.question}</Text>
        <View style = {styles.borderView}>
        
         {data[this.state.ind]?.answers.map((item, index) => (
                <TouchableOpacity
                key = {index}
                style={styles.buttonStyle}
                onPress={() => this.onPress(this.state.ind, item.isCorrect, this.state.points)}
                >
                <Text style = {{fontSize: 18, fontFamily: "Poppins-Light"}}>{item.content}</Text>
              </TouchableOpacity>
         ))}
         
        </View>
           
      </View>
       
      
    );
  }

}






