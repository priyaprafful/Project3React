import React, { Component } from "react";

class RejectedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        We are sorry, your application has been refused by the admin!
      </section>
    );
  }
}

export default RejectedPage;
