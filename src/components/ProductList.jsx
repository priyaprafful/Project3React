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
        
        <div class="field buttons is-grouped">
            <p class="control">
              <button class="button is-primary is-outlined" onClick={event => this.sortByPriceDsc(event)}>
                Lowest To Highest Price
              </button>
             </p>
       
          <p class="control">
            <button class="button is-primary is-outlined" onClick={event => this.sortByPriceAsc(event)}>
              Highest To Lowest Price
            </button>
          </p>
        </div>
        
         <ul>
          {filteredProducts.map(oneProduct => {
            return (
          <div className="product-item">
            <div className="gallery">
              <div className="desc">
              <li key={oneProduct._id}>
                <Link to={getPhoneUrl(oneProduct)}>
                  <img className="img-products" src={oneProduct.image} alt={oneProduct.name} />
                </Link>
                <p> {oneProduct.price} Euro</p>
                <p className="namep">{oneProduct.name}</p>
                <p>{oneProduct.brand}</p>
                <button
                class="button is-warning is-hovered"
                 onClick={event => this.props.addToCart(
                                                oneProduct._id,
                                                oneProduct.name,
                                                oneProduct.image,
                                                oneProduct.price,
                                                event)}>
                  Add to cart
                </button>
              </li>
              </div>
            </div>
          </div>
            );
          })}
        </ul>
       </section>
    );
  }
}

export default ProductList;
