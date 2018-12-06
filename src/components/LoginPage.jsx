import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      originalPassword: ""
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSumbit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5555/api/login", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("LOGIN PAGE", response.data);
        const { userDoc } = response.data;
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("LOGIN PAGE ERROR", err);
        alert("Sorry! Something went wrong!");
      });
  }
  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <section className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <form onSubmit={event => this.handleSumbit(event)}>
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
                  value={this.state.originalPassword}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  placeholder="****"
                  className="login-input"
                />
              </label>
            </div>
            <button
              className="login-btn"
              //   onClick={this.submitRegister.bind(this)}
            >
              LOG IN
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default LoginPage;
