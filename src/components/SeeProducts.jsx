import React, { Component } from "react";
import PendingPage from "./PendingPage";
import RejectedPage from "./RejectedPage";
import axios from "axios";

class SeeProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProduct : []
    };
  }
  componentDidMount() {

    axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/see-products`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Product Details", response.data);
        this.setState({myProduct : response.data});
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on SEE PRODUCTS of SELLER.");
      });
  }
  render() {
    const {myProduct} = this.state;
    
    // const newArr = Object.values(obj);
    console.log("----", this.props);
    console.log(myProduct)
    const productList = myProduct.map(el => {
      return (
        <section className="globaldetail seeproducts">
         <div className="imagedetail">
          <img src={el.image} alt={el.name} />
          </div>
          <div className="detaildes">
          <h1>{el.name}</h1>
          <h3>{el.name}</h3>
          <p>
            by<i>{el.brand}</i>
          </p>
          <b>€{el.price}</b>
          <h4>{el.size}</h4>
          <p>{el.description}</p>
        </div>
        </section>
        

       
      );
    });
    return (
      <section>
        { productList }
        {this.props.accepted && { productList }}
        {!this.props.productCheck.accepted &&
          !this.props.productCheck.rejected && <PendingPage />}
        {this.props.rejected ? <RejectedPage /> : null}
      </section>
    );
  }
}



export default SeeProducts;
