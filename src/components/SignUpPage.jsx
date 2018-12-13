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
      .post(process.env.REACT_APP_SERVER_URL + "/api/signup", this.state, {
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
      <section class="hero has-background-light is-success is-fullheight" >
      <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
        <h3 class="title has-text-grey" >Sign Up</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>

        <div className="box">
        
          <form onSubmit={event => this.handleSubmit(event)}>
            
              <label htmlFor="">
              <div class="field">
                   <div class="control">
                Full Name:
                <input
                  value={this.state.fullName}
                  onChange={event => this.genericSync(event)}
                  type="text"
                  name="fullName"
                  placeholder="Laura"
                  className="input is-large"
                />
                </div>
                </div>
              </label>
            
            
              <label htmlFor="">
              <div class="field">
                 <div class="control">
                Email:
                <input
                  value={this.state.email}
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  className="input is-large"
                />
                </div>
                </div>
              </label>
            
            
              <label htmlFor="">
              <div class="field">
                  <div class="control">
                Password:
                <input
                  value={this.state.password}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  placeholder="*****"
                  className="input is-large"
                />
                </div>
                </div>
              </label>
            
            <button class="button is-block is-info is-large is-fullwidth">Sign Up</button>
          </form>
        </div>
        </div>
        </div>
        </div>
      </section>
    );
  }
}

                   
                   
export default SignUpPage;
