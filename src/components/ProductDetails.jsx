import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ProductList from "./ProductList";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log("inside mount");
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/api/products/${params.productId}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("Product Details", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { _id, image, name, brand, price, size, description } = this.state;
    if (this.props.shouldLogin) {
      return <Redirect to="/login-page" />;
    }
    return (
      <section className="ProductDetails">
        
        <div className="globaldetail">
          <div className="imagedetail">
        <img src={image} alt={name} />
        <div className="addcartbtn">
        <button
        className="button is-warning is-hovered"
          onClick={event =>
            this.props.addToCart(_id, name, image, price, event)
          }
        >
          Add to cart
        </button>
        </div>
          </div>

         <div className="detaildes">
        <h3>{name}</h3>
        <p>
          by <i>{brand}</i>
        </p>
        <b>€{price}</b>
        <h4>{size}</h4>
        <p>{description}</p>
         </div>
        </div>
      </section>
    );
  }
}

export default ProductDetails;
