import React, { Component } from "react";


import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function getPhoneUrl(oneProduct) {
  return `/product-details/${oneProduct._id}`;
}

class ProductList extends Component {
  constructor(props) {
    //console.log("props :::", props);
    super(props);
    this.state = {
    
    };
  }

  

 sortByPriceAsc() {
  console.log("My list before getting sorted", this.props.filteredProducts)
    const { filteredProducts } = this.props;
    //console.log(filteredProducts);
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
    //.log("My list after getting sorted", filteredProducts)
    this.props.syncFilteredArray(filteredProducts);
  }
  sortByPriceDsc() {
    const { filteredProducts } = this.props;
    //console.log(filteredProducts);
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
    this.props.syncFilteredArray(filteredProducts);
  }

  render() {
    const { filteredProducts } = this.props;
    console.log(this.props.shouldLogin)
    if(this.props.shouldLogin){
      return <Redirect to="/login-page"/>
    }
    return (
      <section>
        
        <h1>Choose your product</h1>
        
        
        <button onClick={event => this.sortByPriceDsc(event)}>
          lowest To highest price
        </button>
        <button onClick={event => this.sortByPriceAsc(event)}>
          highest To lowest price
        </button>
         <ul>
          {filteredProducts.map(oneProduct => {
            return (
            
              <li key={oneProduct._id}>
                <Link to={getPhoneUrl(oneProduct)}>
                  <img src={oneProduct.image} alt={oneProduct.name} />
                </Link>
                <p> {oneProduct.price} Euro</p>
                <p>{oneProduct.name}</p>
                <p>{oneProduct.brand}</p>
                <button
                 onClick={event => this.props.addToCart(
                                                oneProduct._id,
                                                oneProduct.name,
                                                oneProduct.image,
                                                oneProduct.price,
                                                event)}>
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
