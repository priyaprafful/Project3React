import React, { Component } from "react";
import axios from "axios";
import FilterProduct from "../components/FilterProduct.js";
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
    this.props.syncFilteredArray(filteredProducts);
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
    this.props.syncFilteredArray(filteredProducts);
  }

  render() {
    const { filteredProducts } = this.props;
    return (
      <section>
        <h1>Choose your product</h1>
        <FilterProduct />
        <button onClick={event => this.sortByPriceDsc(event)}>
          lowest To highest price
        </button>
        <button onClick={event => this.sortByPriceAsc(event)}>
          highest To lowest price
        </button>

        {/* <div className="card"> */}
        <ul>
          {/* <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/> */}
          {filteredProducts.map(oneProduct => {
            return (
              <div className="columns is-mobile">
                <div className="column">
                  <li key={oneProduct._id}>
                    {/* <div className="card-image"> */}
                    {/* <figure className="image is-48x48"> */}
                    <Link to={getPhoneUrl(oneProduct)}>
                      <img src={oneProduct.image} alt={oneProduct.name} />
                    </Link>
                    {/* </figure> */}
                    {/* </div> */}
                    {/* <div className="media-content"> */}
                    <p>{oneProduct.price}</p>
                    <p>{oneProduct.name}</p>
                    <p>{oneProduct.brand}</p>
                    <button onClick={() => this.addToCart(oneProduct._id)}>
                      Add to cart
                    </button>
                    {/* </div> */}
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
        {/* </div> */}
      </section>
    );
  }
}

export default ProductList;
