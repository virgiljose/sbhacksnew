// login

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';

const baseUrl = 'http://localhost:5000/api';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      phone: ""
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignIn(){
    // TODO: API call to a login database
    axios.post(`${baseUrl}/login`, {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      if (res.data.message === 'success') {
        console.log(res.data)
	       this.props.navigation.navigate('OrderPostedList', {
	          username: this.state.username,
	          userId: res.data.userId  // need entry named userId
	         });
	// pass the props, redirect
      } else {
	// do nothing
        this.setState({username: "", password: ""});

      }
    }).catch(err => {
      console.log(err);
    });

    // const resetAction = StackActions.reset({
    //    index: 0,
    //    key: null,
    //    actions: [
    //         NavigationActions.navigate({ routeName: 'TabNav',
    //           params: {
    //             username: this.state.username,
    //             userId: this.state.password//res.data.userId  // need entry named userId
    //           }
    //         })
    //    ],
    // });
    // this.props.navigation.dispatch(resetAction);

    // this.props.navigation.navigate('TabNav', {
    // username: this.state.username,
    // userId: this.state.password//res.data.userId  // need entry named userId
    // });
  }

  handleSignUp(){
    // TODO: API call to a login database
    axios.post(`${baseUrl}/register`, {
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone
    }).then(res => {
      if (res.data.message === 'success') {
        this.props.navigation.navigate('OrderPostedList', {
           username: this.state.username,
           userId: res.data.userId  // need entry named userId
          });
	// pass the props, redirect
      } else {
	// do nothing
      }
    }).catch(err => {
      console.log(err);
    });
    this.setState({username: "", password: ""});
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.form}>
            <TextInput style={styles.formText} autoCapitalize={false} onChangeText={(text) => {
		this.setState({username: text});
	    }} placeholder="username" value={this.state.username}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.form}>
            <TextInput style={styles.formText} autoCapitalize={false} secureTextEntry onChangeText={(text) => {
		this.setState({password: text});
	    }} placeholder="password" value={this.state.password}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.form}>
            <TextInput style={styles.formText} autoCapitalize={false} onChangeText={(text) => {
		this.setState({phone: text});
  }} placeholder="phone number (register)" value={this.state.phone}/>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleSignIn}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
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
export default withNavigation(Login);
