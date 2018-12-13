import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SellerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: "",
      category: "",
      subcategory: "",
      name: "",
      brand: "",
      image: "",
      description: "",
      price: "",
      size: "",
      isSubmitSuccessful: false
      // isFreeShipping: "",
      // selectValue: true
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/seller-form", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Seller Form Page", response.data);
        const { userDoc } = response.data;
        this.setState({ isSubmitSuccessful: true });
      })
      .catch(err => {
        console.log("SELLER FORM ERROR", err);
        alert("Sorry! Something went wrong");
      });

    // const { name, brand, image, description, price, size } = this.state;
    //onSubmit comes from App.js
    // this.props.onSubmit({ name, brand, image, description, price, size });
    //when the form is submitted, you want the input fields to be empty.
    this.setState({
      sku: "",
      category: "",
      subcategory: "",
      name: "",
      brand: "",
      image: "",
      description: "",
      price: "",
      size: ""
      // isFreeShipping: ""
    });
  }

  changeValue(event) {
    console.log(event.target.value);
    this.setState({ selectValue: event.target.value });
  }
  uploadImage(event) {
    const { files } = event.target;
    console.log("File SELECTED", files[0]);

    // THE FORM DATA CLASS WILL FORMAT THE FILES FOR SENDIND TO OUR API
    const uploadData = new FormData();
    uploadData.append("fileSubmission", files[0]);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/upload-file", uploadData, {
        withCredentials: true
      })
      .then(response => {
        console.log("Upload Image", response.data);
        this.setState({ image: response.data.fileUrl });
      })
      .catch(err => {
        console.log("UPLOAD IMAGE ERROR", err);
        alert("Sorry! SOMETHING WENT WRONG");
      });
  }

  render() {
    if (this.state.isSubmitSuccessful) {
      return <Redirect to="/see-products" />;
    }
    if(this.props.shouldLogin){
      return <Redirect to="/login-page"/>
    }
          console.log(this.props.currentUser)

    let submitapp;
    if (this.props.currentUser && this.props.currentUser.isVerified === "notverified" ){
      submitapp = <button  className="button is-block is-info is-large is-fullwidth">Submit your application</button>
    } else {
      submitapp = <button  className="button is-block is-info is-large is-fullwidth">Add your product</button>
    }

    console.log(this.state);
    return (
      <section className="hero has-background-light is-success is-fullheight">
       <div class="hero-body">
        <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Submit your brand</h3>
        <div className="box">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            SKU:
            <input
              value={this.state.sku}
              onChange={event => this.setState({ sku: event.target.value })}
              type="number"
              name="sku"
              placeholder="12345"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Category:
            <input
              value={this.state.category}
              onChange={event =>
                this.setState({ category: event.target.value })
              }
              type="text"
              name="category"
              placeholder="women or man"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            SubCategory:
            <input
              value={this.state.subcategory}
              onChange={event =>
                this.setState({ subcategory: event.target.value })
              }
              type="text"
              name="subcategory"
              placeholder="shirt or dresses"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Brand:
            <input
              value={this.state.brand}
              onChange={event => this.setState({ brand: event.target.value })}
              type="text"
              name="brand"
              placeholder="Lacoste"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Name:
            <input
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              type="text"
              name="name"
              placeholder="Lacoste - Shoes"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Price:
            <input
              value={this.state.price}
              onChange={event => this.setState({ price: event.target.value })}
              type="number"
              name="price"
              placeholder="60 €"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Size:
            <input
              value={this.state.size}
              onChange={event => this.setState({ size: event.target.value })}
              type="text"
              name="size"
              placeholder="S"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
          <div class="field">
          <div class="control">
            Description:
            <input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
              type="text"
              name="description"
              placeholder=" Made of cotton"
              class="input is-large"
            />
            </div>
            </div>
          </label>
          <label htmlFor="">
            Image:
            <input
              // value={this.state.image}
              //Adding the onChange updates the state every time there is a change in the input
              // onChange={event => this.setState({ image: event.target.value })}
              onChange={event => this.uploadImage(event)}
              type="file"
              // name="image"
              // placeholder=""
              // class="input is-large"
            />
          </label>
          <img src={this.state.image} alt="" />
          {/* <label htmlFor="">
            Is it Free Sihpping:
            <select
              className="u-full-width"
              // onChange={this.handleOnChange()}
              value={this.state.selectValue}
              onChange={this.changeValue}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <input
              value={this.state.isFreeShipping}
              onChange={event =>
                this.setState({ isFreeShipping: event.target.value })
              }
              type="text"
              name="isFreeShipping"
              placeholder="Yes"
            />
          </label> */}
          {submitapp}
          
        </form>
        </div>
        </div>
        </div>
        </div>
      </section>
    );
  }
}

export default SellerForm;
