import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import axios from "axios";
// import SearchField from "react-search-field";
//import Search from "./components/SearchBar";

import ProductList from "./components/ProductList.js";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myproducts: [],
      currentUser: null,
      searchString: "",
      filteredProducts: [],
      productArray: [],
      category: "women"
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        console.log("CHECK USER", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
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
  }

  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  changeGender(gender) {
    // event.preventDefault();
    console.log("change gender called", gender);
    const { productArray } = this.state;
    const filteredProducts = productArray.filter(oneProduct => {
      return oneProduct.category === gender;
    });
    this.setState({
      category: gender,
      filteredProducts: filteredProducts
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

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Project 3</h1>
          <NavBar
            currentUser={currentUser}
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
              />
            )}
          />
          <Route
            path="/product-list-man"
            render={() => (
              <ProductList filteredProducts={this.state.filteredProducts} />
            )}
          />
          <Route
            path="/product-list-women"
            render={() => (
              <ProductList filteredProducts={this.state.filteredProducts} />
            )}
          />
          <Route
            path="/product-details/:productId"
            component={ProductDetails}
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
        </Switch>

        <footer>
          <p>Made by Priyanka and Harnit at Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
