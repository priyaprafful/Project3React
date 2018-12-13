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
      <section className="SearchBar">
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
          <div className="HomePage">
            <div>
              <Link to="/product-list-man">
                <img
                  src="https://4.imimg.com/data4/KD/PY/IMOB-29919264/img_20170319_112304-500x500.jpg"
                  alt="man"
                />
              </Link>
              <img src="https://www.khattemeethedesires.com/wp-content/uploads/fashion-accessories-1.jpg" alt="Accesories" />
            </div>
             <div>
              <Link to="/product-list-women">
                <img
                  src="http://assets.myntassets.com/assets/images/1996368/2017/7/28/11501225258060-Rain--Rainbow-Women-Dresses-9391501225257859-1.jpg"
                  alt="women" width="99%"
                />
              </Link>
            </div>
           
          </div>
          
        )}
      </section>
    );
  }
}

export default HomePage;
