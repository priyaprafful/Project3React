import React, { Component } from "react";
import { Link } from "react-router-dom";

class PendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="PendingPage">
        <h1> Congratulations! Your Application was sent successfully.</h1>

        <p>
          You will receive an email when the admin will accept your application
        </p>
        <Link to="/home">Home</Link>
      </section>
    );
  }
}

export default PendingPage;
