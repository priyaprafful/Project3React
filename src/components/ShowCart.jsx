import React, { Component } from 'react';
import axios from 'axios';

class ShowCart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.getCartSummary();
    }

    getCartSummary(){
        console.log("inside getcart summary");
        
        axios.post("http://localhost:5555/api/cartitems",
        { },
        { withCredentials: true }).then((response) => {
            console.log("Product Details", response);
                this.setState(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          //console.log("numbers  ::::", numbers);
          //return numbers;
            
    }

    render() { 
        if (this.props.productData) {
            console.log("product data is :::: ", this.props.productData);
          }
        return ( 
            <section>
                <h1>My Cart</h1>
            </section>
         );
    }
}
 
export default ShowCart;