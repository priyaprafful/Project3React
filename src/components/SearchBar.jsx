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
      <form>
        <label>
          Search Item :
          <input
            type="text"
            name="search"
            placeholder="Search your item"
            onChange={event => searchFunction(event)}
            value={value}
          />
        </label>
      </form>
    );
  }
}

export default Search;
