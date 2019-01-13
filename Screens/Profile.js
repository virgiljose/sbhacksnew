import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {withNavigation} from 'react-navigation';

const baseUrl = 'http://localhost:5000/api';

let tempUser = {
  username: 'Gang',
  address: 'ucla',
  city: 'la',
  deliveryInterval: [
    {
      deliveryStartTime: '01_30_12_30',
      deliveryEndTime: '01_30_13_30'
    },
    {
      deliveryStartTime: '02_01_14_30',
      deliveryEndTime: '02_01_15_30'
    }
  ]
}


class DeliveryStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      day: '',
      shour: '',
      smin: '',
      ehour: '',
      emin: ''
    };
    this.handleAddInterval = this.handleAddInterval.bind(this);
  }

  handleAddInterval() {
    // TODO: Make api call to add an interval to the user
    //       and also setState a new array containing new intervals
  }

  componentDidMount() {

  }

  render() {
    let user = tempUser;
    return(
      <View style={styles.container}>
	<View>
	  <Text style={styles.buttonText}>
	    {user.username}
	  </Text>
	  <Text style={styles.buttonText}>
	    {user.address}
	  </Text>
	  <Text style={styles.buttonText}>
	    {user.city}
	  </Text>
	  <View>
	    {user.deliveryInterval.map(interval => {
	       return (
		 <Text style={styles.buttonText}>
		   {interval.deliveryStartTime} - {interval.deliveryEndTime}
		 </Text>
	       );
	    })}
	  </View>
	</View>

	<View style={styles.formContainer}>
          <TouchableOpacity style={styles.form}>
            <TextInput style={styles.formText} onChangeText={(text) => this.setState({month: text})} placeholder="Month" value={this.state.month}/>
	    <TextInput style={styles.formText} onChangeText={(text) => this.setState({day: text})} placeholder="Day" value={this.state.day}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.form}>
	    <TextInput style={styles.formText} onChangeText={(text) => this.setState({shour: text})} placeholder="Hour" value={this.state.shour}/>
	    <TextInput style={styles.formText} onChangeText={(text) => this.setState({smin: text})} placeholder="Minute" value={this.state.smin}/>
          </TouchableOpacity>

	  <TouchableOpacity style={styles.form}>
	    <TextInput style={styles.formText} onChangeText={(text) => this.setState({ehour: text})} placeholder="Hour" value={this.state.ehour}/>
	    <TextInput style={styles.formText} onChangeText={(text) => this.setState({emin: text})} placeholder="Minute" value={this.state.emin}/>
          </TouchableOpacity>
	</View>

	<View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleAddInterval}>
            <Text style={styles.buttonText}>Add an interval</Text>
          </TouchableOpacity>
	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498DB",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  form: {
    marginVertical: 10,
    backgroundColor: "#F4F6F7",
    height: 40,
    width: 350,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 2, //IOS
  },
  formText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    marginHorizontal: 10,
  },
  formContainer: {
    flex: 1,
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#F4F6F7",
    height: 50,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 2, //IOS
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Avenir Next",
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
})
export default withNavigation(DeliveryStatus)
