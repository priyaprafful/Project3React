import React, { Component } from "react";
import Search from "./SearchBar";
import ProductList from "./ProductList";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit() {
    // this.setState({});
  }

  render() {
    return (
      <section className="HomePage">
        <Search
          // onSubmit={this.handleSubmit}
          searchFunction={event => this.props.handleSearch(event)}
          value={this.props.searchString}
        />
        {this.props.searchString ? (
          <ProductList filteredProducts={this.props.filteredProducts} />
        ) : (
          <div>
            <div>
              <img src="" alt="man-image" />
            </div>
            <div>
              <img src="" alt="women-image" />
            </div>
            <div>
              <img src="" alt="Accesories-image" />
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default HomePage;
