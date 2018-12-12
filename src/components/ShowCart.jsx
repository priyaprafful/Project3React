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
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("you need to login to add product");
      return <Redirect to="/login-page" />;
    }
  }

  render() {
    const { productData, cartTotal } = this.props;
    return (
      <section className="MyCart">
        <h1>My Cart</h1>
        <table id="mycart">
          <tbody>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
            </tr>

            {productData.map(oneProduct => {
              return (
                <tr key={oneProduct.id}>
                  <th>
                    <img src={oneProduct.imagePath} alt={oneProduct.name} />
                  </th>
                  <th>
                    <p>{oneProduct.name}</p>
                  </th>
                  <th>
                    <p>{oneProduct.price}</p>
                  </th>
                  <th>
                    <button
                      onClick={event =>
                        this.removeFromCart(
                          oneProduct.id,
                          oneProduct.name,
                          oneProduct.imagePath,
                          oneProduct.price,
                          event
                        )
                      }
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
            <tr>
              <th />
              <th />
              <th>cart total is {cartTotal}</th>
            </tr>
          </tbody>
        </table>

        <Link to="/order-form">
          <button>Checkout</button>
        </Link>
      </section>
    );
  }
}

export default ShowCart;
