import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function getPhoneUrl(oneProduct) {
  return `/product-details/${oneProduct.id}`;
}

class ShowCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeFromCart(productId, name, image, price, event) {
    event.preventDefault();
    var productString = productId + "|" + name + "|" + image + "|" + price;
    if (this.props.currentUser != null) {
      axios
        .post(
          process.env.REACT_APP_SERVER_URL + "/api/removeFromcart",
          {
            productString: productString,
            price: price
          },
          { withCredentials: true }
        )
        .then(response => {
          // window.location.reload(); // something else can be used, need to ask
          this.props.setCartData();
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
        const {productData,cartTotal} = this.props;
        console.log("this is my product data",productData)
        return ( 
            <section className="MyCart">
                <h1><b>Shopping Basket</b></h1>

                <table className="table is-fullwidth mycart has-background-light">
                <tbody>
            {productData.length > 0  && 
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                    </tr> }
                
                        
                        {productData.map(oneProduct => {
                        return (
                            <tr key={oneProduct.id}>
                            
                            <td><img src={oneProduct.imagePath} alt={oneProduct.name} /></td>
                            <td>{oneProduct.name}</td>
                            <td>{oneProduct.price}</td>
                             <td><button className="button is-danger" onClick={event => this.removeFromCart(oneProduct.id,oneProduct.name, oneProduct.imagePath,oneProduct.price, event)}>
                                    Remove
                                </button></td>
                            </tr>
                            );
                        })}
                        <tr>
                            <th></th>
                            <th></th>
                            <th> Subtotal {cartTotal} Euro</th>
                        </tr>
                    </tbody>
                </table>
           
                <Link to="/order-form"><button className="button is-success">Checkout</button></Link>
                
                </section>
         );
    }
  }

 
  

export default ShowCart;
