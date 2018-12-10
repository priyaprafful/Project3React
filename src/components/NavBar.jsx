import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MyCart from "../components/MyCart";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.currentUser };
  }
  render() {
    return (
      <section className="NavBar">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink to="/home" className="navbar-item">
              <img
                src="https://tbncdn.freelogodesign.org/f92673bd-6759-4602-b2d2-4ac6e6914bfb.png?1544276767910"
                alt=""
                // width="112"
                // height="28"
              />
            </NavLink>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <NavLink className="navbar-item" exact to="/home">
                Home
              </NavLink>
              <NavLink
                onClick={() => this.props.changeGender("man")}
                to="/product-list-man"
                className="navbar-item"
              >
                Man
              </NavLink>
              <NavLink
                onClick={() => this.props.changeGender("women")}
                to="/product-list-women"
                className="navbar-item"
              >
                Women
              </NavLink>
              <NavLink className="navbar-item" to="/seller-form">
                Add Products
              </NavLink>
            </div>
          </div>
          {this.props.currentUser ? (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <NavLink to="/showcart">
                    Mycart -{this.props.cartProductNumbers}
                  </NavLink>
                  <b>{this.props.currentUser.fullName}</b>
                  <button
                    onClick={() => this.props.logoutClick()}
                    className="button is-light"
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {/* <span> */}
                  <NavLink className="button is-primary" to="/signup-page">
                    Sign Up
                  </NavLink>
                  <NavLink className="button is-light" to="/login-page">
                    Log In
                  </NavLink>
                  {/* </span> */}
                </div>
              </div>
            </div>
          )}
        </nav>
      </section>
    );
  }
}

export default NavBar;
