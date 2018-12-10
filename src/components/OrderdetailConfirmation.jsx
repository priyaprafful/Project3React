import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ShowCart from "../components/ShowCart"
import axios from "axios";
class OrderDetailConfirmation  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    confirmOrder(){
        console.log("user   ", this.props.currentUser);
        if(this.props.currentUser!=null){
          axios.post("http://localhost:5555/api/orderConfirmation",{ withCredentials: true })
          .then(response=> {
            window.location.reload(); // something else can be used, need to ask
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        } else{
          console.log("you need to login to add product");
           return <Redirect to='/login-page'/>;
        }
    }


    render() { 
        if (this.props.productData) {
            console.log("product data is :::: ", this.props.productData);
        }
        const {productData,cartTotal} = this.props;
        return ( 
            <section>
               
                <h1>Your final order</h1>
                <table id="mycart">
                    <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                   
                   
                    </tr>
                    
                    {productData.map(oneProduct => {
                    return (
                        <tr key={oneProduct.id}>
                          
                          <th><img src={oneProduct.imagePath} alt={oneProduct.name} /></th>
                          <th><p>{oneProduct.name}</p></th>
                          <th><p>{oneProduct.price}</p></th>
                          <th><button onClick={event => this.removeFromCart(oneProduct.id,oneProduct.name, oneProduct.imagePath,oneProduct.price, event)}>
                                Remove
                            </button></th>
                        </tr>
                        );
                    })}
                <tr>
                    <th></th>
                    <th></th>
                    <th>cart total is {cartTotal}</th>
                </tr>
                </table>
               <button>Confirm Your Order</button>
            </section>
         );
    }
}
 
export default OrderDetailConfirmation;