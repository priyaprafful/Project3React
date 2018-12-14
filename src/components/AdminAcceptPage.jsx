import React, { Component } from "react";
import axios from "axios"

class AdminAcceptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProducts: []
    };
  }
  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/api/alltheproducts/`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("Product Details", response.data);
        this.setState({myProducts : response.data});
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong.");
      });
  }
  render() {
    const { myProducts } = this.state;
    let productsAccepted = myProducts.filter(oneProduct => {
      return oneProduct.isVerified === "verified"
    })
    return (
      <section>
        <h1 classname="title">Your Sellers</h1>
        {productsAccepted.map(oneProduct => {
          return (
            <section className="globaldetail seeproducts">
            <div className="imagedetail">
             <img src={oneProduct.image} alt={oneProduct.name} />
             </div>
             <div className="detaildes">

             <h3>{oneProduct.name}</h3>
             <p>
               by<i>{oneProduct.brand}</i>
             </p>
           </div>
           </section>
          )
        })}
      </section>
    );
  }
}

export default AdminAcceptPage;
