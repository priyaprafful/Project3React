import React, { Component } from "react";
import axios from "axios";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5555/api/products/${params.productId}`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Pone Details", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const { image, name, brand, price, size, description } = this.state;
    return (
      <section className="ProductDetails">
        <h3>Product Details</h3>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>
          by<i>{brand}</i>
        </p>
        <b>€{price}</b>
        <h4>{size}</h4>
        <button>Add to Cart</button>
        <p>{description}</p>
      </section>
    );
  }
}

export default ProductDetails;
