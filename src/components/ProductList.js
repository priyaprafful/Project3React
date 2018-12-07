import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getPhoneUrl(oneProduct) {
  return `/product-details/${oneProduct._id}`;
}

class ProductList extends Component {
  addToCart(productId) {
    console.log("productId", productId);
    axios.get("http://localhost:5555/api/addtocart/productId");
  }

  sortByPriceAsc() {
    const { filteredProducts } = this.props;
    console.log(filteredProducts);
    filteredProducts.sort((a, b) => {
      if (a.price < b.price) {
        //sort string ascending
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(filteredProducts);
    // this.setState({
    //   filteredProducts
    // });
  }
  sortByPriceDsc() {
    const { filteredProducts } = this.props;
    console.log(filteredProducts);
    filteredProducts.sort((a, b) => {
      if (a.price > b.price) {
        //sort string ascending
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(filteredProducts);
    // this.setState({
    //   filteredProducts
    // });
  }

  render() {
    const { filteredProducts } = this.props;
    return (
      <section>
        <h1>Choose your product</h1>
        <button onClick={this.sortByPriceDsc}>lowest To highest price</button>
        <button onClick={this.sortByPriceAsc}>highest To lowest price</button>
        <ul>
          {filteredProducts.map(oneProduct => {
            return (
              <li key={oneProduct._id}>
                <Link to={getPhoneUrl(oneProduct)}>
                  <img src={oneProduct.image} alt={oneProduct.name} />
                </Link>
                <p>{oneProduct.price}</p>
                <p>{oneProduct.name}</p>
                <p>{oneProduct.brand}</p>
                <button onClick={() => this.addToCart(oneProduct._id)}>
                  Add to cart
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ProductList;
