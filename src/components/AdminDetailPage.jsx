import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AdminDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
      rejected: false,
      isVerified: "notverified"
    };
  }

  acceptbutton() {
    console.log("clicked accept");
    const { params } = this.props.match;
    axios
      .put(
        process.env.REACT_APP_SERVER_URL +
          `/api/products/${params.productId}/accept`,
        {},
        { withCredentials: true }
      )
      .then(response => {
        this.setState({ isVerified: "verified", accepted: true }, () =>
          this.props.productCheck(this.state)
        );
        console.log(response.data);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on Detail PAGE of Admin.");
      });
  }

  rejectbutton() {
    console.log("clicked reject");
    const { params } = this.props.match;
    axios
      .put(
        process.env.REACT_APP_SERVER_URL +
          `/api/products/${params.productId}/reject`,
        {},
        { withCredentials: true }
      )
      .then(response => {
        this.setState({ isVerified: "refused", rejected: true }, () =>
          this.props.productCheck(this.state)
        );

        console.log(response.data);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on Detail PAGE of Admin.");
      });
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log("inside mount");
    axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/api/products/${params.productId}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("Product Details", response.data);
        this.setState(response.data, () => this.props.productCheck(this.state));
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on Detail PAGE of Admin.");
      });
  }

  render() {
    console.log("PROPS IN ADMIN DETAIL", this.props);
    const {
      image,
      name,
      brand,
      price,
      size,
      description,
      accepted,
      rejected
    } = this.state;

    if (accepted) {
      return <Redirect to={"/adminlistpage"} />;
    }

    if (rejected) {
      return <Redirect to={"/rejectedpage"} />;
    }

    return (
      <section className="companydetailpg">
        <h1>Company Detail Page </h1>
        <div className="globalcmpntdetail">
          
        
        <div className="globalcmpntdetailimg img">
     
        <img src={image} alt={name} />
        
        </div>
        
       
        
       
       <div className="globalcmpntdetaildes">
       
        <h3><b>Name: </b> {name}</h3>
        <p>
          by <i>  {brand}</i>
        </p><b>Price:</b>
        <b> €{price}</b>
        <h4><b>Size:</b> {size}</h4>
        <p><b>Description:</b> {description}</p>
        
        </div>
     
        </div>
        <div>
       
         
       <button className=" button is-primary Acceptbtn is-medium" onClick={() => this.acceptbutton()}>Accept</button>
       <button className=" button is-danger Rejectbtn  is-medium" onClick={() => this.rejectbutton()}>Reject</button>
       
       </div>
          
        
      
      
      </section>
    );
  }
}

export default AdminDetailPage;
