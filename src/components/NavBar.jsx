import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.currentUser };
  }

  render() {
    console.log(this.props.currentUser);
    const { loggedInUser } = this.state;
    const {currentUser} = this.props;
    //const newArr = Object.values(currentUser);

    console.log("-----", loggedInUser);

    let navLinks;

    if(currentUser && currentUser.role === "admin"){
      navLinks = (
      <React.Fragment>
        <NavLink className="navbar-item" to="/adminlistpage">
          Companies
        </NavLink>
        <NavLink className="navbar-item" to="/adminrefusedpage">
          Refused Application
        </NavLink>
        <NavLink className="navbar-item" to="/adminacceptpage">
          Accepted
        </NavLink>
        <NavLink className="navbar-item" to="/adminsettings">
          Settings
        </NavLink>
      </React.Fragment>)
    } 

    let seeproductlink;
    if (currentUser && currentUser.isVerified === "verified"){
      seeproductlink = <NavLink className="navbar-item" to="/see-products">
      See Products
    </NavLink>
    }

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
              <NavLink to="/product-list-man" className="navbar-item">
                Man
              </NavLink>
              <NavLink to="/product-list-women" className="navbar-item">
                Women
              </NavLink>
                      
              <NavLink 
               shouldLogin={this.props.shouldLogin}     
              className="navbar-item" to="/seller-form" >
                Add Products
              </NavLink>
              {navLinks}
              {seeproductlink}
            
      
            </div>
          </div>
          {this.props.currentUser ? (
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
               
                  <NavLink to="/showcart" >
                 My cart : {this.props.cartProductNumbers}
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
