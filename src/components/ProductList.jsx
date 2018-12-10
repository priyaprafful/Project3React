import React, { Component } from "react";
import axios from "axios";
import FilterProduct from "../components/FilterProduct.js";
import { Link } from "react-router-dom";
import  { Redirect } from 'react-router-dom';

function getPhoneUrl(oneProduct) {
  return `/product-details/${oneProduct._id}`;
}

class ProductList extends Component {
    
    constructor(props) {
        console.log("props :::",props);
        super(props);
        this.state = {};
    }    


  addToCart(productId,name,image, price,event) {


   // (this.props.currentUser ? (console.log("true")) : <Redirect to={{ pathname:"/login-page"}}/> )

    event.preventDefault();
    console.log("productId", productId);
    console.log("user   ", this.props.currentUser);
    if (this.props.currentUser === null){
     // console.log("true ffffff")
      return <Redirect to= {"/login-page"}/>
    } else {
      axios.post("http://localhost:5555/api/addtocart",{
        key: productId,
        name:name,
        image:image,
        price:price
      },{ withCredentials: true }).then(function (response) {
        window.location.reload(); // something else can be used, need to ask
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
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
        <FilterProduct syncSelectCheckBox={this.props.syncSelectCheckBox}/>
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
              
                <Link to={getPhoneUrl(oneProduct)} >
                  <img src={oneProduct.image} alt={oneProduct.name} />
                </Link>
                <p>{oneProduct.price}</p>
                <p>{oneProduct.name}</p>
                <p>{oneProduct.brand}</p>
                <button
                 onClick={event => this.addToCart(oneProduct._id,oneProduct.name, oneProduct.image,oneProduct.price, event)}>
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
