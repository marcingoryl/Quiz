import React, { Component, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
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
      textAlign: "center"
  },
  borderView: {
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 15
  },
  buttonStyle: {
    width: 350,
    height: 40,
    justifyContent: "center",
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
    };
  } 

  onPress = (ind, isCorrect, points) => {
    if(isCorrect){
        points++
    }

    let i = this.state.ind;
    if(i < this.tasks.length-1){
        i++
    }
    else this.props.navigation.navigate('Results')
    
      this.setState({
          ind: i,
          isCorrect: "false",
          points: points,
          timer: 30,
          progress: 0,
        
      })
      console.log('punkty: ',points)
  }

  tasks = [
    {
      "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
      "answers": [
        {
          "content": "LUCJUSZA CYNNA",
          "isCorrect": true
        },
        {
          "content": "JULIUSZ CEZAR",
          "isCorrect": false
        },
        {
          "content": "LUCJUSZ MURENA",
          "isCorrect": false
        },
        {
          "content": "MAREK KRASSUS",
          "isCorrect": false
        }
      ],
      "duration": 30
    },
    {
        "question": "Ile jest 2+2",
        "answers": [
          {
            "content": "2",
            "isCorrect": false
          },
          {
            "content": "4",
            "isCorrect": true
          },
          {
            "content": "3",
            "isCorrect": false
          },
          {
            "content": "8",
            "isCorrect": false
          }
        ],
        "duration": 30
      }, 
      {
        "question": "Kto jest obecnym prezydentem Polski?",
        "answers": [
          {
            "content": "Bronisław Komorowski",
            "isCorrect": false
          },
          {
            "content": "Lech Wałęsa",
            "isCorrect": false
          },
          {
            "content": "Aleksander Kwaśniewski",
            "isCorrect": false
          },
          {
            "content": "Andrzej Duda",
            "isCorrect": true
          }
        ],
        "duration": 30
      }, 
  ]


  componentDidMount() {
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

  render() {


    return (
      
        <View>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }}
        />
        <View style={styles.numOfQuestTime}>
          <Text style={styles.textStyle}>Question {this.state.ind+1} of {this.tasks.length}</Text>
          <Text style = {styles.timeStyle}>Time: {this.state.timer} sec</Text>
        </View>
        <View style = {{alignItems: "center", marginTop: 50}}>
        <Progress.Bar
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
        </View>
        <Text style = {styles.questionStyle}>{this.tasks[this.state.ind].question}</Text>
        <View style = {styles.borderView}>
        
         {this.tasks[this.state.ind].answers.map((item, index) => (
                <TouchableOpacity
                key = {index}
                style={styles.buttonStyle}
                onPress={() => this.onPress(this.state.ind, item.isCorrect, this.state.points)}
                >
                <Text style = {{fontSize: 18}}>{item.content}</Text>
              </TouchableOpacity>
         ))}
         
        </View>
      </View>
       
      
    );
  }

}






