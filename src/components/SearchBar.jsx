import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // category: ""
    };
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   // this.props.onSubmit({})
  // }

  render() {
    console.log(this.state);
    const { searchFunction, value } = this.props;
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label>
          Search Item :
          <input
            type="text"
            name="search"
            placeholder="Search your item"
            onChange={event => searchFunction(event)}
            value={value}
          />
          <button>Search</button>
        </label>
      </form>
    );
  }
}

export default Search;

// function Search(props) {
// console.log(props);
//   return (
//   );
// }

// export default Search;
