import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";



class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shippingName:"",
            shippingAddress:"",
            shippingMobile:"",
            orderSucces:false


         }
    }

    genericSync(event) {
        const { name, value } = event.target;
        //console.log("name and value are ", name, value);
        this.setState({ [name]: value });
      }
    
    handleSubmit(event) {
        event.preventDefault();
        if(this.props.currentUser!=null){
            console.log("productData  in order form : ",this.props.productData);
            var productString = JSON.stringify(this.props.productData);

            axios.post("http://localhost:5555/api/place-order",{
                shippingName:this.state.shippingName,
                shippingAddress:this.state.shippingAddress,
                shippingMobile:this.state.shippingMobile,
                orderedProducts:productString
                },{ withCredentials: true })
                .then((response)=> {
                    console.log("response after placed order :::", response.data.orderId);
                    var orderId =  response.data.orderId;
                    //var redirectionURL = "/orderSuccess"+"?o="+orderId;
                    //pass paramater on redirect
                    this.props.setCartToZero();
                    this.setState({orderSucces:true})
                    
               }).catch( (error)=> {
                console.log(error);
               });
            } else{
            console.log("you need to login to add product");
            return <Redirect to='/login-page'/>;
            }
           return <Redirect to='/'/>; 
    }
     
    
    render() { 
        if(this.state.orderSucces){
        return <Redirect to="/orderSuccess"/>;
     }
       return ( 
          <section>
              
              <div className="Order-form">
                <form onSubmit={event => this.handleSubmit(event)} className="OrderForm">
                <h1>Fill Your Details</h1>
                      <label>Name:
                          <input type="text" value={this.state.name} placeholder="Your Name" name="shippingName" onChange={event => this.genericSync(event)} />
                      </label>

                      <label>Address:
                          <input type="text" value={this.state.address} placeholder="Your shiiping Address" name="shippingAddress" onChange={event => this.genericSync(event)} />
                      </label>
                      <label>Mobile No:
                          <input type="number" value={this.state.mobileno} placeholder="064646464" name="shippingMobile"  onChange={event => this.genericSync(event)} />
                      </label>
                      <input type="submit" value="Place your order"/>
 
                  </form>
                </div>  
            </section>
         );
    }
}

export default OrderForm;