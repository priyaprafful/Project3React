import React, { Component } from "react";
import PendingPage from "./PendingPage";
import RejectedPage from "./RejectedPage";
import axios from "axios";

class SeeProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // const { params } = this.props.match;
    console.log("inside mount");
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/see-products`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Product Details", response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on SEE PRODUCTS of SELLER.");
      });
  }
  render() {
    const obj = this.state;
    const newArr = Object.values(obj);
    console.log("----", this.props);
    const productList = newArr.map(el => {
      return (
        <div>
          <h1>{el.name}</h1>
          <img src={el.image} alt={el.name} />
          <h3>{el.name}</h3>
          <p>
            by<i>{el.brand}</i>
          </p>
          <b>€{el.price}</b>
          <h4>{el.size}</h4>
          <p>{el.description}</p>
        </div>
      );
    });
    return (
      <section>
        {this.props.accepted && { productList }}
        {!this.props.productCheck.accepted &&
          !this.props.productCheck.rejected && <PendingPage />}
        {this.props.rejected ? <RejectedPage /> : null}
      </section>
    );
  }
}

export default SeeProducts;
