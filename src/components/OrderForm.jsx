import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingName: "",
      shippingAddress: "",
      shippingMobile: "",
      orderSucces: false,
      orderId: ""
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    //console.log("name and value are ", name, value);
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.currentUser != null) {
      //console.log("productData  in order form : ",this.props.productData);
      var productString = JSON.stringify(this.props.productData);

      axios
        .post(
          process.env.REACT_APP_SERVER_URL + "/api/place-order",
          {
            shippingName: this.state.shippingName,
            shippingAddress: this.state.shippingAddress,
            shippingMobile: this.state.shippingMobile,
            orderedProducts: productString
          },
          { withCredentials: true }
        )
        .then(response => {
        //pass paramater on redirect
          this.props.setCartToZero();
          this.setState({ orderSucces: true, orderId: response.data.orderId });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("you need to login to add product");
      return <Redirect to="/login-page" />;
    }
    return <Redirect to ="/"/>
}
     
    
    render() { 
        if(this.state.orderSucces){
           var  redirectionLink = "/orderSuccess?orderId="+this.state.orderId;
        return <Redirect to={redirectionLink}/>;
     }
       return ( 
          <section>
              
              <div className="OrderForm has-background-light">
                <form onSubmit={event => this.handleSubmit(event)}>
                <h1>Your Shipping Information</h1>
                 <div className="row">

                 
                 <div className="col-25">
                      <label>Name </label>
                 </div>
                 <div className="col-75">
                    <input type="text" value={this.state.name} placeholder="Your Name" name="shippingName" onChange={event => this.genericSync(event)} />
                 </div>
                <div className="col-25">
                     <label>Address</label>
                </div>
                <div className="col-75">     
                    <input type="text" value={this.state.address} placeholder="Your shiiping Address" name="shippingAddress" onChange={event => this.genericSync(event)} />
                </div>
                <div className="col-25">
                      <label>Mobile No</label>
                 </div>
                <div className="col-75"> 
                    <input type="number" value={this.state.mobileno} placeholder="064646464" name="shippingMobile"  onChange={event => this.genericSync(event)} />
                </div>
                <div className="row">
                    <input type="submit" value="Place your order" className="button is-success orderformbtn"/>
                </div>
                </div>
                </form>
              </div>  
            </section>
         );
    }

   };

export default OrderForm;
