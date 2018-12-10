import React, { Component } from "react";
import Search from "./SearchBar";
import ProductList from "./ProductList";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="HomePage">
        <Search
          searchFunction={event => this.props.handleSearch(event)}
          value={this.props.searchString}
        />
        {this.props.searchString ? (
          <ProductList
            filteredProducts={this.props.filteredProducts}
            syncFilteredArray={this.props.syncFilteredArray}
            syncSelectCheckBox={this.props.syncSelectCheckBox}
          />
        ) : (
          <div>
            <div>
              <img src="" alt="man" />
            </div>
            <div>
              <img src="" alt="women" />
            </div>
            <div>
              <img src="" alt="Accesories" />
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default HomePage;
