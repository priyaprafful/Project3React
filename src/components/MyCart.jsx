import React, { Component } from 'react';
import axios from "axios";

class MyCart extends Component {
    constructor(props) {
        console.log("props :::",props);
        super(props);
        this.state = {
            productAmount: 0
          };
    }
    componentDidMount() {
        // you should probably get the information as soon as the component loads
        this.getNumberOfProducts();
    } 
    getNumberOfProducts(){
        var numbers  ;
        axios.post("http://localhost:5555/api/myproducts",
            { loggedInUser: this.props.loggedInUser },
            { withCredentials: true }).then(function (response) {
                numbers  = response.data.numbers;
                console.log("numbers   :::::::::", numbers);
                //console.log("number of products in mycart compomemt :::::", response.data['numbers']);
                this.setState({productAmount:numbers});
          })
          .catch(function (error) {
            console.log(error);
          });
          //console.log("numbers  ::::", numbers);
          //return numbers;
    }

    render() { 
        return ( 
            <section>
                <h1 onClick="/showcart">my cart {this.state.productAmount}</h1>
            </section>
         );
    }
}
 
export default MyCart;