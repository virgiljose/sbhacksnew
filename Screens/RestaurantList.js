// overview.js

// interface:
  // show list of restaurants (also include a search bar) - use a restaurant API to generate list
  // once a restaurant is selected: go to a page that displays its corresponding menu (pass in restaurant and geolocation props) - restaurantmenu.js

import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {withNavigation} from 'react-navigation';


const baseUrl = 'http://localhost:5000/api';

let tempRestaurantList = [
  {
    name: 'Mcd',
    address: '330 de neve dr',
    city: 'los angeles'
  },
  {
    name: 'in-n-out',
    address: '234 noway',
    city: 'san diego'
  },
  {
    name: 'randomfood',
    address: 'random place',
    city: 'random city'
  },
  {
    name: 'seafoodplace',
    address: 'by the sea 233',
    city: 'sea city'
  }
]

class RestaurantList extends Component {
  constructor(props) {
    // props: longitude, latitude
    super(props);
    this.state = {
      // list of restaurants
      list: [],
      query: "",
    };
    this.renderList = this.renderList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickRestaurant = this.handleClickRestaurant.bind(this);
  }

  componentDidMount() {
    axios.get(`${baseUrl}/restaurantindex`)
	 .then(res => {
	   this.setState({list: res.data.restaurantlist}); // need entry restaurantlist
	 }).catch(err => {
	   console.log(err);
	 });
    this.setState({list: tempRestaurantList});
  }

  handleSubmit() {
    // TODO: API call --> this.setState({list: results})
    console.log(this.props.navigation.state)
    this.setState({query: ""});
  }

  handleClickRestaurant(rname, addr) {

    this.props.navigation.navigate('RestaurantMenu', {
      rname: rname,
      addr: addr,
      // username: this.props.navigation.state.params.username,
      // userId: this.props.navigation.state.params.userId
    })
    /// redirect, pass the props
  }

  renderList() {
    return (this.state.list).map((restaurant) => {
      return(
        <TouchableOpacity style={styles.button}
			  onPress={this.handleClickRestaurant
				       .bind(this, restaurant.restaurant_name,
					     restaurant.address)}>
          <Text style={styles.text}>{restaurant.name}</Text>
          <Text style={styles.text}>{restaurant.address}</Text>
          <Text style={styles.text}>{restaurant.city}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.search}>
          <TextInput style={styles.text} onChangeText={(text) => {
	      this.setState({query: text});
	  }} onSubmitEditing={this.handleSubmit} placeholder="search"
		     value={this.state.query}/>
        </TouchableOpacity>
        {this.renderList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 50,
    backgroundColor: "#3498DB",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
  text: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    marginHorizontal: 10,
  },
});
export default withNavigation(RestaurantList);
