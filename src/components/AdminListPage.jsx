import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function getProductUrl(oneProduct) {
  return `/admindetailpage/${oneProduct._id}`;
}

class AdminListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminlist: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/adminlistpage", { withCredentials: true })
      .then(response => {
        console.log("ADMIN LIST", response.data);
        this.setState({ adminlist: response.data });
        // console.log("CHECK US", response.data);
        // const { userDoc } = response.data;
        // this.syncCurrentUser(userDoc);
        // this.getNumberOfProducts(userDoc);
        // return axios.get("http://localhost:5555/api/products");
      })
      // })
      .catch(err => {
        console.log("CHECK USER ERROR or product List error", err);
        alert("Sorry!Something went wrong");
      });
  }
  render() {
    const { adminlist } = this.state;
    console.log(adminlist);
    console.log(this.state.adminlist);
    return (
      <section>
        <h1>Admin Page</h1>
        {this.state.adminlist.map(oneProduct => {
          return (
            <li key={oneProduct._id}>
              <Link to={getProductUrl(oneProduct)}>See Details</Link>
              <p>{oneProduct.name}</p>
            </li>
          );
        })}
      </section>
    );
  }
}

export default AdminListPage;
