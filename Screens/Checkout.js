// Checkout:

// select tip amount, location, and delivery date/time
import axios from 'axios';
import React, {Component} from 'react';
import {DatePickerIOS, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';

const baseUrl = 'http://localhost:5000/api';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: "",
      location: "",
      //      latitude: null,
      //      longitude: null,
      month: "",
      day: "",
      hour: "",
      min: ""
    };
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  // TODO: API; given an address or name of venue, return its coordinates (in a JSON format)
  handleCheckout() {
    // TODO: API; create an order object containing the information
    let month = this.state.month;
    let day = this.state.day;
    let hour = this.state.hour;
    let min = this.state.min;
  //   axios.post(`${baseUrl}/placeorder`, {
  //     username: this.props.navigation.state.params.username,
  //     food_ordered: {
	// restaurant_name: this.props.navigation.state.params.rname,
	// address: this.props.navigation.state.params.addr,
	// price: this.props.navigation.state.params.price,
	// ...order
  //     },
  //     deliver_time: `${month}_${day}_${hour}_${min}`,
  //     deliver_address: this.state.location,
  //     fee: this.state.tip
  //   }).then(res => {
  //     // redirect to profile
  //   }).catch(err => {
  //     console.log(err);
  //   });
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.form}>
          <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({tip: value});
	  }} placeholder={"Tip"} value={this.state.tip}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.form}>
          <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({location: value});
	  }} placeholder={"Location"} value={this.state.location}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.form}>
	  <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({month: value});
	  }} placeholder={"Month (01-12)"} value={this.state.month}/>
	  <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({day: value});
	  }} placeholder={"Day (01-31)"} value={this.state.day}/>
	  <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({hour: value});
	  }} placeholder={"Hour (00-23)"} value={this.state.hour}/>
	  <TextInput style={styles.formText} onChangeText={(value) => {
	      this.setState({min: value});
	  }} placeholder={"Minute (00-59)"} value={this.state.min}/>
        </TouchableOpacity>
	<TouchableOpacity style={styles.button} onPress={this.handleCheckout}>
          <Text style={styles.buttonText}>Make the order!</Text>
        </TouchableOpacity>
      </ScrollView>
    )
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
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
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
});

export default withNavigation(Checkout);
