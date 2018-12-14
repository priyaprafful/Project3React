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
      .post(process.env.REACT_APP_SERVER_URL + "/api/login", this.state, {
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
      <section className="hero has-background-light is-success is-fullheight">
       <div className="hero-body">
        <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Login</h3>
        <p className="subtitle has-text-grey">Please login to proceed.</p>
        <div className="box">
          <form onSubmit={event => this.handleSumbit(event)}>
            <div className="input-group">
              <label htmlFor="">
              <div className="field">
                    <div className="control">
                Email:
                <input
                  value={this.state.email}
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  className="input is-large"  placeholder="Your Email" autoFocus=""
                />
                    </div>
                </div>
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="">
              <div className="field">
                        <div className="control">
                Password:
                <input
                  value={this.state.originalPassword}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  className="input is-large" placeholder="Your Password"
                />
                </div>
                </div>
              </label>
            </div>
            <button
              className="button is-block is-info is-large is-fullwidth"
              //   onClick={this.submitRegister.bind(this)}
            >
              LOG IN
            </button>
          </form>
        </div>
        </div>
    </div>
</div>
      </section>
    );
  }
}
export default LoginPage;
