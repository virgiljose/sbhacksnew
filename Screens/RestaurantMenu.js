// restaurantmenu.js

// Functionality:
// From restaurantlist.js --> show that restaurant's menu and add menu options

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import axios from 'axios';
import {withNavigation} from 'react-navigation';

const baseUrl = 'http://localhost:5000/api';

let tempItems = [
  {
    crab: {
      name: 'crab',
      price: 5,
      quantity: 0
    }
  },
  {
    fish: {
      name: 'fish',
      price: 3,
      quantity: 0
    }
  }
]

class RestaurantMenu extends Component {

  constructor(props) {
    // props: restaurant, latitude, longitude
    super(props);
    this.state = {
      items: [
        {
          crab: {
            name: 'crab',
            price: 5,
            quantity: 0
          }
        },
        {
          fish: {
            name: 'fish',
            price: 3,
            quantity: 0
          }
        }
      ], // array of itemName: {price, quantity}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.setState({items: tempItems});

    let rId = this.props.navigation.state.params.rId;  // need props
  //   axios.get(`${baseUrl}/restaurant/${rId}`)
	//  .then(res => {
	//    this.setState({items: res.data.items}); // need entry named items
	//  }).catch(err => {
	//    console.log(err);
	//  });
  }

  // when user submits items s/he wants to order:
  // create an array of items that are part of the order (i.e. with quantity > 0) --> pass list down to Checkout
  onSubmit() {
    order = (this.state.items).filter((item) => {return item[Object.keys(item)[0]].quantity > 0});
    let totalPrice = 0;
    order.forEach(item => {
      totalPrice += item[Object.keys(item)[0]].price * item[Object.keys(item)[0]].quantity;
    })
    this.props.navigation.navigate('Checkout', {
      rname: this.props.navigation.state.params.rname,
      addr: this.props.navigation.state.params.addr,
      username: this.props.navigation.state.params.username,
      userId: this.props.navigation.state.params.userId,
      order: order,
      price: totalPrice
    });

    // TODO --> navigate to checkout page, passing the order (as well as restaurant, latitude, longitude) as a prop
  }

  // increment function called when + or - button is pressed
  incrementQuantity(itemName, sign) {
    newItems = this.state.items;
    // increment
    if(sign === true) {
        ++newItems[index][Object.keys(newItems[index])[0]].quantity;
    }
    // decrement (if quantity > 0)
    else if(sign === false && newItems[index][Object.keys(newItems[index])[0]].quantity > 0) {
      --newItems[index][Object.keys(newItems[index])[0]].quantity;
    }
    this.setState({items: newItems});
  }

  // set quantity of given item equal to the quantity typed by user
  changeQuantity(itemName, index, quantity) {
    newItems = this.state.items;

    if(quantity >= 0) {
      newItems[index][Object.keys(newItems[index])[0]].quantity = quantity;
    }

    this.setState({items: newItems});
  }

  renderItems() {
    // TODO: Take each element of this.state.items:
    // display the item, its price, and quantity to be ordered
    // render buttons that allow user to adjust quantity to be ordered:
    // each item whose quantity ordered > 0 is added to this.state.order
    return (this.state.items).map((item, i) => {
      console.log(item)
      return(
        <TouchableOpacity style={styles.button}>
          <View style={styles.subContainer}>
            <Text style={styles.text}>{item[Object.keys(item)[0]].name}</Text>
            <Text style={styles.text}>{item[Object.keys(item)[0]].price}</Text>

          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity
	      onPress={this.incrementQuantity.bind(this, item[Object.keys(item)[0]].name, i, true)}>
              <Text style={styles.plusminus}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
	      onPress={this.incrementQuantity.bind(this, item[Object.keys(item)[0]].name, i, false)}>
              <Text style={styles.plusminus}>-</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {

    var Menu = this.renderItems();

    return(
      <ScrollView contentContainerStyle={styles.container}>
        {Menu}
        <TouchableOpacity onPress={this.onSubmit}>
          <Text style={styles.text}>Checkout!</Text>
        </TouchableOpacity>
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
  subContainer: {
    flex: 1,
    flexDirection: "column",
  },
  search: {
    marginVertical: 10,
    backgroundColor: "#F4F6F7",
    height: 30,
    width: 350,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.5, // IOS
    shadowRadius: 2, //IOS
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#F4F6F7",
    height: 100,
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
  text: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    marginHorizontal: 10,
  },
  plusminus: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    marginHorizontal: 10,
  },
});
export default withNavigation(RestaurantMenu);
