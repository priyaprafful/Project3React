import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";

import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import axios from "axios";

import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import SellerForm from "./components/SellerForm";
import ShowCart from "./components/ShowCart";
import PendingPage from "./components/PendingPage";
import SeeProducts from "./components/SeeProducts";
import AdminListPage from "./components/AdminListPage";
import AdminDetailPage from "./components/AdminDetailPage";
import AdminRefusedpage from "./components/AdminRefusedPage";
import AdminAcceptPage from "./components/AdminAcceptPage";
import AdminSettings from "./components/AdminSettings";
import OrderForm from "./components/OrderForm";
import SuccessPage from "./components/SuccessPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myproducts: [],
      currentUser: null,
      searchString: "",
      menProducts: [],
      womenProduct: [],
      filteredProducts: [],
      productArray: [],
      category: "women",
      selecteCheckBox: [],
      cartProductNumbers: 0,
      productData: [],
      cartTotal: 0,
      productCheck: [],
      shouldLogin: false
    };
  }

  // ------------------ CHECK USER ANG GET PRODUCTS ------------------
  componentDidMount() {
    //console.log("process env",process.env.REACT_APP_SERVER_URL);

    axios
      .get(process.env.REACT_APP_SERVER_URL + "/api/checkuser", {
        withCredentials: true
      })
      .then(response => {
        //console.log("CHECK USER", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
        this.setCartData();
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/products");
      })
      .then(response => {
        let allMenProduct = response.data.filter(oneProduct => {
          return oneProduct.category === "man";
        });
        let allwomenProducts = response.data.filter(oneProduct => {
          return oneProduct.category === "women";
        });

        this.setState({
          productArray: response.data,
          menProducts: allMenProduct,
          womenProduct: allwomenProducts
        });
      })
      .catch(err => {
        console.log("CHECK USER ERROR or product List error", err);
        alert("Sorry!Something went wrong");
      });
  }

  //----------------set state of current user -------------
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  //-------------- set state of search result ----------

  syncFilteredArray = filteredArray => {
    //console.log("filteredArray received in app.js", filteredArray)
    this.setState({ menProducts: filteredArray }, () =>
      console.log("State APP JS after setstate", this.state)
    );
  };

  syncSelectCheckBox = oneSIZE => {
    const { selecteCheckBox } = this.state;
    const selecteCheckBoxCopy = [...selecteCheckBox];
    selecteCheckBoxCopy.push(oneSIZE);
    const newFilteredArray = this.filterSize();
    this.setState({
      selecteCheckBox: selecteCheckBoxCopy,
      filteredProducts: newFilteredArray
    });
  };

  filterSize() {
    const { selecteCheckBox, productArray } = this.state;
    const selectSize = productArray.filter(oneProduct => {
      return oneProduct.size.some(function(onesize) {
        return selecteCheckBox.includes(onesize);
      });
    });
    //console.log(selectSize);
    return selectSize;
  }

  addToCart = (productId, name, image, price, event) => {
    event.preventDefault();
    if (this.state.currentUser === null) {
      this.setState({ shouldLogin: true });
    } else {
      axios
        .post(
          process.env.REACT_APP_SERVER_URL + "/api/addtocart",
          {
            key: productId,
            name: name,
            image: image,
            price: price
          },
          { withCredentials: true }
        )
        .then(response => {
          this.setCartData();
          // window.location.reload(); // something else can be used, need to ask
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  setCartData() {
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/api/myproducts",
        {},
        { withCredentials: true }
      )
      .then(response => {
        var result = JSON.parse(response.data.products)["Products"];
        this.setState({
          productData: result,
          cartProductNumbers: response.data.numbers,
          cartTotal: response.data.cartTotal
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setCartToZero = () => {
    this.setState({ cartProductNumbers: 0 });
  };

  logoutClick() {
    axios
      .delete(process.env.REACT_APP_SERVER_URL + "/api/logout", {
        withCredentials: true
      })
      .then(this.syncCurrentUser(null))
      .catch(err => {
        console.log("LOGOUT ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  //------------Search --------------------------

  handleSearch(event) {
    const { value } = event.target;

    const filteredArray = this.state.productArray.filter(oneProduct => {
      const lowerValue = value.toLowerCase();
      return (
        oneProduct.name.toLowerCase().includes(lowerValue) ||
        oneProduct.brand.toLowerCase().includes(lowerValue) ||
        oneProduct.subcategory.toLowerCase().includes(lowerValue) ||
        oneProduct.description.toLowerCase().includes(lowerValue)
      );
    });
    this.setState({
      searchString: value,
      filteredProducts: filteredArray
    });
  }

  // Handle Accepted or Rejected products

  handleProductCheck(productStatus) {
    this.setState({ productCheck: productStatus }, () =>
      console.log("My State after productCheck function", this.state)
    );
  }
  //-----------seller form  --------------
  // handleSubmit(){

  // }

  render() {
    const {
      currentUser,
      productData,
      cartTotal,
      productArray,
      menProducts,
      womenProduct
    } = this.state;
    //console.log("Cart total in APP.JS before return", cartTotal)
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1>Project 3</h1> */}
          <NavBar
            currentUser={currentUser}
            cartProductNumbers={this.state.cartProductNumbers}
            logoutClick={() => this.logoutClick()}
          />
        </header>
        <Switch>
          <Route
            path="/home"
            render={() => (
              <HomePage
                handleSearch={event => this.handleSearch(event)}
                searchString={this.state.searchString}
                filteredProducts={this.state.filteredProducts}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
                addToCart={this.addToCart}
                shouldLogin={this.state.shouldLogin}
              />
            )}
          />
          <Route
            path="/product-list-man"
            render={() => (
              <ProductList
                currentUser={currentUser}
                // filteredProducts={productArray.filter(oneProduct => {
                //   return oneProduct.category === "man";
                // })}
                filteredProducts={menProducts}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
                addToCart={this.addToCart}
                shouldLogin={this.state.shouldLogin}
                sortByPriceDsc={this.sortByPriceDsc}
              />
            )}
          />
          <Route
            path="/product-list-women"
            render={() => (
              <ProductList
                currentUser={currentUser}
                // filteredProducts={productArray.filter(oneProduct => {
                //   return oneProduct.category === "women";
                // })}
                filteredProducts={womenProduct}
                syncFilteredArray={this.syncFilteredArray}
                syncSelectCheckBox={this.syncSelectCheckBox}
                addToCart={this.addToCart}
                shouldLogin={this.state.shouldLogin}
              />
            )}
          />
          <Route
            path="/product-details/:productId"
            render={({ match }) => (
              <ProductDetails
                addToCart={this.addToCart}
                match={match}
                shouldLogin={this.state.shouldLogin}
                filteredProducts={this.state.filteredProducts}
              />
            )}
          />
          <Route
            path="/seller-form"
            render={()=>(
              currentUser ? 
              (<SellerForm
                         
              currentUser={currentUser}
              />) :
              (<Redirect to="/login-page" />)
            )}
          />
          <Route
            path="/signup-page"
            render={() => {
              return (
                <SignUpPage
                  currentUser={currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route path="/pending-page" component={PendingPage} />
          <Route
            path="/see-products"
            render={props => {
              return (
                <SeeProducts
                  {...props}
                  currentUser={currentUser}
                  productCheck={this.state.productCheck}
                />
              );
            }}
          />

          <Route path="/adminlistpage" component={AdminListPage} />
          <Route path="/adminrefusedpage" component={AdminRefusedpage} />
          <Route path="/adminacceptpage" component={AdminAcceptPage} />
          <Route
            path="/admindetailpage/:productId"
            render={props => {
              return (
                <AdminDetailPage
                  {...props}
                  currentUser={currentUser}
                  productCheck={event => this.handleProductCheck(event)}
                />
              );
            }}
          />
          <Route path="/adminsettings" component={AdminSettings} />

          <Route
            path="/showcart"
            render={() => {
              return (
                <ShowCart
                  currentUser={currentUser}
                  productData={productData}
                  cartTotal={cartTotal}
                  setCartData={cart => this.setCartData(cart)}
                />
              );
            }}
          />
          <Route
            path="/login-page"
            render={() => {
              return (
                <LoginPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route
            path="/order-form"
            render={() => {
              return (
                <OrderForm
                  currentUser={this.state.currentUser}
                  productData={this.state.productData}
                  setCartToZero={this.setCartToZero}
                  // onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
          <Route
            path="/orderSuccess"
            render={() => {
              return (
                <SuccessPage
                  currentUser={this.state.currentUser}
                  // onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
        </Switch>
{/* <div>

        <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>
</div> */}
      </div>
    );
  }
}

export default App;
