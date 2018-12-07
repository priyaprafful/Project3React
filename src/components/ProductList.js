import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getPhoneUrl(oneProduct) {
  return `/product-details/${oneProduct._id}`;
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   productArray: [],
      //   filteredProducts: [],
      //   category: ""
    };
  }
  componentDidMount() {
    // axios
    //   .get("http://localhost:5555/api/products")
    //   .then(response => {
    //     //console.log("Product-List",response.data)
    //     const filteredProducts = response.data.filter(filterbygender => {
    //       return filterbygender.category === this.props.category;
    //     });
    //     this.setState({
    //       filteredProducts: filteredProducts,
    //       productArray: response.data,
    //       category: this.props.category
    //     });
    //   })
    //   .catch(err => {
    //     console.log("ProductList Error", err);
    //   });
  }

  //static getDerivedStateFromProps(nextProps, prevState) {
  // // console.log('nextProps,', nextProps, 'prevState,', prevState)
  // if (nextProps.category !== prevState.category) {
  //   const { productArray } = prevState;
  //   const filteredArray = productArray.filter(filterbygender => {
  //     return filterbygender.category === nextProps.category;
  //   });
  //   return {
  //     filteredProducts: filteredArray,
  //     category: nextProps.category
  //   };
  // }
  // return null;
  //}

  addToCart(productId) {
    console.log("productId", productId);
  }

  render() {
    const { filteredProducts } = this.props;
    return (
      <section>
        <h1>Choose your product</h1>
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
