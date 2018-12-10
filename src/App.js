import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import axios from "axios";

import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import SellerForm from "./components/SellerForm";
import ShowCart from "./components/ShowCart";
import OrderForm from "./components/OrderForm";
import OrderdetailConfirmation from "./components/OrderdetailConfirmation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myproducts: [],
      currentUser: null,
      searchString: "",
      filteredProducts: [],
      productArray: [],
      category: "women",
      selecteCheckBox: [],
      cartProductNumbers: 0,
      productData: [],
      cartTotal: 0
    };
  }

  // ------------------ CHECK USER ANG GET PRODUCTS ------------------
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        console.log("CHECK USER", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
        this.getNumberOfProducts(userDoc);
        return axios.get("http://localhost:5555/api/products");
      })
      .then(response => {
        //console.log("Product-List",response.data)
        this.setState({
          productArray: response.data
        });
      })
      .catch(err => {
        console.log("CHECK USER ERROR or product List error", err);
        alert("Sorry!Something went wrong");
      });

    console.log("user is set after mount :::::", this.state.currentUser);
  }

  //----------------set state of current user -------------
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  //-------------- set state of search result ----------

  syncFilteredArray = filteredArray => {
    this.setState({ filteredProducts: filteredArray });
  };

  syncSelectCheckBox = oneSIZE => {
    const { selecteCheckBox } = this.state;
    const selecteCheckBoxCopy = [...selecteCheckBox];
    selecteCheckBoxCopy.push(oneSIZE);
    const newFilteredArray = this.filterSize();
    this.setState({
      selecteCheckBox: selecteCheckBoxCopy,
      filteredProducts: newFilteredArray
    });
  };

  filterSize() {
    const { selecteCheckBox, productArray } = this.state;
    const selectSize = productArray.filter(oneProduct => {
      return oneProduct.size.some(function(onesize) {
        return selecteCheckBox.includes(onesize);
      });
    });
    console.log(selectSize);
    return selectSize;
  }

 getNumberOfProducts(userDoc){
    axios.post("http://localhost:5555/api/myproducts",{ },{ withCredentials: true })
      .then((response) => {
        //console.log("complete jsoon is ::::: ",response.data);
        //console.log("numberof products in app  :::::::::", response.data.numbers);
        //console.log(" products in app  :::::::::", response.data.products);
        //convetting string to jsonn object, so that we can retreiev values easily from Products json
        var result = JSON.parse(response.data.products)['Products'];
        //console.log(" products in app  after parse :::::::::", result);
        this.setState({productData:result});
        //console.log("prodcts data    ::::", this.state.productData);
        this.setState({cartProductNumbers:response.data.numbers});
        //console.log("cart total before set is ::::: ",this.state.cartTotal)
        this.setState({cartTotal:response.data.cartTotal});
        //console.log("cart total after set is ::::: ",this.state.cartTotal)
        
      }).catch(function (error) {
        console.log(error);
      });
  }

  logoutClick() {
    axios
      .delete("http://localhost:5555/api/logout", { withCredentials: true })
      .then(this.syncCurrentUser(null))
      .catch(err => {
        console.log("LOGOUT ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  //------------Search --------------------------

  handleSearch(event) {
    const { value } = event.target;
    //console.log(value);
    console.log(this.state);
    // console.log(filteredProducts);
    const filteredArray = this.state.productArray.filter(oneProduct => {
      const lowerValue = value.toLowerCase();
      return (
        oneProduct.name.toLowerCase().includes(lowerValue) ||
        oneProduct.brand.toLowerCase().includes(lowerValue) ||
        oneProduct.subcategory.toLowerCase().includes(lowerValue) ||
        oneProduct.description.toLowerCase().includes(lowerValue)
      );
    });
    this.setState({
      searchString: value,
      filteredProducts: filteredArray
    });
  }

  //-----------seller form  --------------
  // handleSubmit(){

  // }

  render() {
    const { currentUser,productData, cartTotal, productArray } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1>Project 3</h1> */}
          <NavBar
            currentUser={currentUser}
            cartProductNumbers={this.state.cartProductNumbers}
            logoutClick={() => this.logoutClick()}
            changeGender={gender => this.changeGender(gender)}
          />
        </header>
        <Switch>
          <Route
            path="/home"
            render={() => (
              <HomePage
                handleSearch={event => this.handleSearch(event)}
                searchString={this.state.searchString}
                filteredProducts={this.state.filteredProducts}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
              />
            )}
          />
          <Route
            path="/product-list-man"
            render={() => (
              <ProductList
                currentUser={currentUser}
                filteredProducts={productArray.filter(oneProduct => {
                  return oneProduct.category === "man"
                })}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
              />
            )}
          />
          <Route
            path="/product-list-women"
            render={() => (
              <ProductList
                currentUser={currentUser}
                filteredProducts={productArray.filter(oneProduct => {
                  return oneProduct.category === "women"
                })}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
              />
            )}
          />
          <Route
            path="/product-details/:productId"
            component={ProductDetails}
          />
          <Route
            path="/seller-form"
            // onSubmit={this.handleSubmit}
            component={SellerForm}
          />
          <Route
            path="/signup-page"
            render={() => {
              return (
                <SignUpPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route
            path="/showcart"
            render={() => {
              return (
                <ShowCart
                  currentUser={currentUser}
                  productData={productData}
                  cartTotal={cartTotal}
                />
              );
            }}
          />
          <Route
            path="/login-page"
            render={() => {
              return (
                <LoginPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route
            path="/order-form"
            render={() => {
              return (
                <OrderForm
                  currentUser={this.state.currentUser}
                  productData={this.state.productData}
                 // onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route
            path="/orderDetail-confirmation"
            render={() => {
              return (
                <OrderdetailConfirmation
                  currentUser={this.state.currentUser}
                  productData = {productData}
                  cartTotal = {cartTotal}
                 // onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
        </Switch>

        <footer>
          <p>Made by Priyanka and Harnit at Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
