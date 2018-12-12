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
      .post("http://localhost:5555/api/seller-form", this.state, {
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
      .post("http://localhost:5555/api/upload-file", uploadData, {
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
    console.log(this.state);
    return (
      <section>
        <h1>Submit your brand</h1>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="">
            SKU:
            <input
              value={this.state.sku}
              onChange={event => this.setState({ sku: event.target.value })}
              type="number"
              name="sku"
              placeholder="12345"
            />
          </label>
          <label htmlFor="">
            Category:
            <input
              value={this.state.category}
              onChange={event =>
                this.setState({ category: event.target.value })
              }
              type="text"
              name="category"
              placeholder="women or man"
            />
          </label>
          <label htmlFor="">
            SubCategory:
            <input
              value={this.state.subcategory}
              onChange={event =>
                this.setState({ subcategory: event.target.value })
              }
              type="text"
              name="subcategory"
              placeholder="shirt or dresses"
            />
          </label>
          <label htmlFor="">
            Brand:
            <input
              value={this.state.brand}
              onChange={event => this.setState({ brand: event.target.value })}
              type="text"
              name="brand"
              placeholder="Lacoste"
            />
          </label>
          <label htmlFor="">
            Name:
            <input
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              type="text"
              name="name"
              placeholder="Lacoste - Shoes"
            />
          </label>
          <label htmlFor="">
            Price:
            <input
              value={this.state.price}
              onChange={event => this.setState({ price: event.target.value })}
              type="number"
              name="price"
              placeholder="60 €"
            />
          </label>
          <label htmlFor="">
            Size:
            <input
              value={this.state.size}
              onChange={event => this.setState({ size: event.target.value })}
              type="text"
              name="size"
              placeholder="S"
            />
          </label>
          <label htmlFor="">
            Description:
            <input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
              type="text"
              name="description"
              placeholder=" Made of cotton"
            />
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
          <button>Submit your application</button>
          <button>Add your product</button>
        </form>
      </section>
    );
  }
}

export default SellerForm;
