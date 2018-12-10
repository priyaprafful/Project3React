import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
function getPhoneUrl(oneProduct) {
    return `/product-details/${oneProduct.id}`;
  }
  

class ShowCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    removeFromCart(productId,name,image, price,event) {
        event.preventDefault();
        console.log("productId", productId);
        console.log("user   ", this.props.currentUser);

        var productString  = productId+"|"+name+"|"+image+"|"+price;
        console.log("product String to be deleted is ::::: ",productString);
        if(this.props.currentUser!=null){
          axios.post("http://localhost:5555/api/removeFromcart",{
            productString: productString,
            price:price
          },{ withCredentials: true }).then(response=> {
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
                <h1>My Cart</h1>
                <ul>
                    {productData.map(oneProduct => {
                    return (
                        <li key={oneProduct.id}>
                            <Link to={getPhoneUrl(oneProduct)}>
                                <img src={oneProduct.imagePath} alt={oneProduct.name} />
                            </Link>
                            <p>{oneProduct.price}</p>
                            <p>{oneProduct.name}</p>
                            <button onClick={event => this.removeFromCart(oneProduct.id,oneProduct.name, oneProduct.imagePath,oneProduct.price, event)}>
                                Remove
                            </button>
                        </li>
                        );
                    })}
                </ul>
                <h2>cart total is   {cartTotal}</h2>
            </section>
         );
    }
}
 
export default ShowCart;