// overview.js

// interface:
// show list of restaurants (also include a search bar) - use a restaurant API to generate list
// once a restaurant is selected: go to a page that displays its corresponding menu (pass in restaurant and geolocation props) - restaurantmenu.js

import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

let tempList = [
  {
    username: 'Shawn',
    restaurant: 'tacobell',
    raddress: 'some big place',
    rcity: 'sb',
    food: [
      {
	name: 'burrito',
	price: 3,
	quantity: 2
      },
      {
	name: 'burger',
	price: 5,
	quantity: 1
      }
    ],
    award: 3,
    address: 'ucsb',
    city: 'sb',
    time: '12:30pm'
  },
  {
    username: 'Eggert',
    restaurant: 'ino',
    raddress: 'some big place',
    rcity: 'la',
    food: [
      {
	name: 'sandwitch',
	price: 9,
	quantity: 3
      },
      {
	name: 'burger',
	price: 5,
	quantity: 2
      }
    ],
    award: 3,
    address: 'ucla',
    city: 'la',
    time: '1:30pm'
  },
  {
    username: 'Gang',
    raddress: 'some big place',
    rcity: 'la',
    restaurant: 'tdrjoe',
    food: [
      {
	name: 'cookie',
	price: 1,
	quantity: 10
      },
      {
	name: 'burger',
	price: 5,
	quantity: 1
      }
    ],
    award: 2,
    address: 'ucla',
    city: 'la',
    time: '12:00pm'
  }
]

class OrderPostedList extends Component {

  constructor(props) {
    // props: longitude, latitude
    super(props);
    this.state = {
      // list of restaurants
      list: [],
    };
    this.renderList = this.renderList.bind(this);
    this.handleClickOrder = this.handleClickOrder.bind(this);
  }

  componentDidMount() {
    axios.get(`${baseUrl}/orderindex/${this.props.navigation.state.params.username}`) // need props
	 .then(res => {
	   this.setState({list: res.data.orderlist}); // need entry called orderlist
	 }).catch(err => {
	   console.log(err);
	 });
  }

  handleClickOrder(order) {

    console.log(this.props.navigation.state);

    // const resetAction = StackActions.reset({
    //    index: 0,
    //    key: null,
    //    actions: [
    //         NavigationActions.navigate({ routeName: 'OrderPosted',
    //           params: {
    //             //username: this.props.navigation.state.params.username,
    //             //userId: this.props.navigations.state.params.userId//res.data.userId  // need entry named userId
    //           }
    //         })
    //    ],
    // });
    // this.props.navigation.dispatch(resetAction);
    console.log(order)
    this.props.navigation.navigate('OrderPosted', {
      order: order,
      username: this.props.navigation.state.params.username,
      userId: this.props.navigation.state.params.userId
    });
    //redirect, pass the props

  }

  renderList() {
      return (this.state.list).map(e => {
        if (!e.food_ordered) {
          e.food_ordered = {}
        }
        return (
    <TouchableOpacity style={styles.button}
          onPress={this.handleClickOrder.bind(this, e)}>
            <Text style={styles.buttonText}>
        {e.food_ordered.restaurant_name}
      </Text>
      <Text style={styles.buttonText}>
        {e.deliver_time}
      </Text>
      <Text style={styles.buttonText}>
        {e.deliver_address}
      </Text>
      <Text style={styles.buttonText}>
        {e.fee}
      </Text>
      <Text style={styles.buttonText}>
        {e.username}
      </Text>
          </TouchableOpacity>
        )

    // TODO: Take each element of this.state.list --> create a TouchableOpacity button that takes you to the menu screen
  })
}

  render() {

    const List = this.renderList();

    return(
      <ScrollView contentContainerStyle={styles.container}>
        {List}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#3498DB",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    flex: 1,
    backgroundColor: "#F4F6F7",
    flexDirection: "column",
    height: 120,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 2, //IOS
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Avenir Next"
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
})
export default withNavigation(OrderPostedList);
