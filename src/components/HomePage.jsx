import React, { Component } from "react";
import Search from "./SearchBar";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

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
            addToCart={this.props.addToCart}
            shouldLogin={this.props.shouldLogin}
          />
        ) : (
          <div>
            <div>
              <Link to="/product-list-man">
                <img
                  src="https://i.pinimg.com/originals/27/6f/88/276f88aef0ad1b5514509f7bfdcebd44.jpg"
                  alt="man"
                />
              </Link>
            </div>
            <div>
              <Link to="/product-list-women">
                <img
                  src="http://assets.myntassets.com/assets/images/1996368/2017/7/28/11501225258060-Rain--Rainbow-Women-Dresses-9391501225257859-1.jpg"
                  alt="women"
                />
              </Link>
            </div>
            {/* <div>
              <img src="" alt="Accesories" />
            </div> */}
          </div>
        )}
      </section>
    );
  }
}

export default HomePage;
