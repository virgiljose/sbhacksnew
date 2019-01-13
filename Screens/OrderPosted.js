import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {withNavigation} from 'react-navigation';

const baseUrl = 'http://localhost:5000/api';

let tempOrder = {
  username: 'Gang',
  raddress: 'some big place',
  food_ordered: {
    restaurant: 'McDonalds',

  },
  fee: 2,
  deliver_address: 'ucla',
  deliver_time: '12:00pm'
}

let dish_ordered = [
  ['cookie', 1, 3],
  ['burger', 5, 1],
  ['sandwitch', 3, 3]
]

class OrderPosted extends Component {

  constructor(props) {

    super(props);
    this.state = {
      order: {}
    };

    this.handleTakeOrder = this.handleTakeOrder.bind(this);
  }

  handleTakeOrder() {
    // TODO: Make api call to change the order status to match
    //       and also push the order to the deliver guy's list
    //       and also navigate to the delivery status page
    let oId = this.props.navigation.state.params.order._id;  // need props
    axios.put(`${baseUrl}/order/${oId}`, {
      status: 'matched',
      username: this.props.navigation.state.params.username
    }).then(res => {
      this.props.navigation.navigate('DeliveryStatus', {
	         oId: oId,
	         order: this.state.order,
	         username: this.props.navigation.state.params.username,
	         userId: this.props.navigation.state.params.userId
      });
      // pass the props, redirect
    }).catch(err => {
      console.log(err);
    });
    this.props.navigation.navigate('DeliveryStatus', {
         oId: oId,
         order: this.state.order,
         username: this.props.navigation.state.params.username,
         userId: this.props.navigation.state.params.userId
    });
  }

  componentDidMount() {
    this.setState({order: this.props.navigation.state.params.order}); // need entry named order


  }


  render() {
    let order = this.state.order;
    // return (
    //   <Text>
    //   {this.props.navigation.state.params.order.deliver_address}
    //   </Text>
    // )



    console.log(this.props.navigation.state.params.order)
    return(
      <View style={{marginTop: 50}}>
      	<Text style={styles.buttonText}>
      	  Username: {this.props.navigation.state.params.order.username}
      	</Text>
      	<Text style={styles.buttonText}>
      	  Restaurant: {this.props.navigation.state.params.order.food_ordered.restaurant_name}
      	</Text>
      	<Text style={styles.buttonText}>
      	  Restaurant Addres: {this.props.navigation.state.params.order.food_ordered.address}
      	</Text>
        <View>
      	  {dish_ordered.map(item => {
      	     return (
      	       <Text style={styles.buttonText}>
      		       Name: {item[0]}, Price: {item[1]}, Quantity: {item[2]}
      	       </Text>
      	     )
      	  })}
          </View>
    	<Text style={styles.buttonText}>
    	  Deliver before: {this.props.navigation.state.params.order.deliver_time}
    	</Text>
    	<Text style={styles.buttonText}>
    	  Deliver to: {this.props.navigation.state.params.order.deliver_address}
    	</Text>
    	<Text style={styles.buttonText}>
    	  Fee: {this.props.navigation.state.params.order.fee}
    	</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={this.handleTakeOrder}>
          <Text style={styles.buttonText}>Take this order!</Text>
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
export default withNavigation(OrderPosted);
