import React, { Component } from "react";
import axios from "axios";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      originalpassword: ""
    };
  }
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5555/api/signup", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Sign Up Page", response.data);
        const { userDoc } = response.data;
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("SIGNUP PAGE ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  render() {
    if (this.props.currentUser) {
      return (
        <section className="SignUp Page">
          <h2>You are signed up!</h2>
          <p>
            Welcome ,{this.props.currentUser.fullName}! Your user ID is
            <b>{this.props.currentUser._id}</b>
          </p>
        </section>
      );
    }
    return (
      <section className="inner-container">
        <div className="header">Sign Up</div>
        <div className="box">
          {/* <div className="input-group"> */}
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="input-group">
              <label htmlFor="">
                Full Name:
                <input
                  value={this.state.fullName}
                  onChange={event => this.genericSync(event)}
                  type="text"
                  name="fullName"
                  placeholder="Laura"
                  className="login-input"
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="">
                Email:
                <input
                  value={this.state.email}
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  className="login-input"
                />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="">
                Password:
                <input
                  value={this.state.password}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  placeholder="*****"
                  className="login-input"
                />
              </label>
            </div>
            <button className="login-btn">Sign Up</button>
          </form>
        </div>
      </section>
    );
  }
}

export default SignUpPage;
