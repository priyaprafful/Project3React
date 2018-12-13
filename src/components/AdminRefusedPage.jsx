import React, { Component } from "react";
import axios from "axios";


class AdminRefusedpage extends Component {
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
    console.log(myProducts)
    let productsRejected = myProducts.filter(oneProduct => {
      return oneProduct.isVerified === "rejected"
    })

    return (
      <section>
        <h1>Refused Page</h1>
        {productsRejected.map(oneProduct => {
          return (<div>oneProduct.name</div>)
        })}
        <div></div>
      </section>
    );
  }
}

export default AdminRefusedpage;
