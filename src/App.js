import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import axios from "axios";
// import SearchField from "react-search-field";
import Search from "./components/SearchBar";

import ProductList from "./components/ProductList.js";





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myproducts: ProductList,
      currentUser: null,
      searchString: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        console.log("CHECK USER", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log("CHECK USER ERROR", err);
        alert("Sorry!Something went wrong");
      });
  }
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
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
    const filteredArray = ProductList.filter(oneProduct =>
      oneProduct.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ searchString: value, myproducts: filteredArray });
  }

  render() {
    const { searchString } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Project 3</h1>
          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/product-list-man">Man</NavLink>
            <NavLink to="/product-list-women">Women</NavLink>
            {this.state.currentUser ? (
              <span>
                <b>{this.state.currentUser.fullName}</b>
                <button onClick={() => this.logoutClick()}>LOG OUT</button>
              </span>
            ) : (
              <span>
                <NavLink to="/signup-page">Sign Up</NavLink>
                <NavLink to="/login-page">Log In</NavLink>
              </span>
            )}
          </nav>
        </header>
        <Search
          searchFunction={event => this.handleSearch(event)}
          value={searchString}
        />
        {/* <SearchField
          placeholder="Search..."
          onEnter={onEnter}
          searchText="This is initial search text"
          className="test-class"
        /> */}
        <Switch>
            <Route path="/product-list-man"  render={()=><ProductList category="man"/>}/>
            <Route path="/product-list-women"  render={()=><ProductList category="women"/>}/>
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
