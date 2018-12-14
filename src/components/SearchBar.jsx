import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.state);
    const { searchFunction, value } = this.props;
    return (
      <form className="Search">
        <label>
          
          <input
            type="text"
            name="search"
            placeholder="Search your product"
            onChange={event => searchFunction(event)}
            value={value}
            className="input is-info"
          />
        </label>
      </form>
    );
  }
}

export default Search;
