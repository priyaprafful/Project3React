import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
import OrderForm from "./components/OrderForm";
import SuccessPage from "./SuccessPage";


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
      shouldLogin:false
    };
  }

  // ------------------ CHECK USER ANG GET PRODUCTS ------------------
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        //console.log("CHECK USER", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
        this.setCartData();
        return axios.get("http://localhost:5555/api/products");
      })
      .then(response => {
        let allMenProduct = response.data.filter(oneProduct => {
          return oneProduct.category === "man"
        });
        let allwomenProducts = response.data.filter(oneProduct => {
          return oneProduct.category === "women"
        });

       this.setState({
          productArray: response.data,
          menProducts: allMenProduct,
          womenProduct:allwomenProducts,
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
    this.setState({ menProducts: filteredArray }, ()=> console.log("State APP JS after setstate",this.state));
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
  

  addToCart = (productId,name,image, price,event) => {
    event.preventDefault();
    if (this.state.currentUser === null){
     this.setState({shouldLogin:true})
    } else {
      axios.post("http://localhost:5555/api/addtocart",{
        key: productId,
        name:name,
        image:image,
        price:price
      },
      { withCredentials: true })
        .then( (response) => {
         this.setCartData();
        // window.location.reload(); // something else can be used, need to ask
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

 setCartData(){
      axios.post("http://localhost:5555/api/myproducts", {},{ withCredentials: true })
        .then((response) => {
          var result = JSON.parse(response.data.products)['Products'];
          this.setState({
            productData:result,
            cartProductNumbers:response.data.numbers,
            cartTotal:response.data.cartTotal
          });
        })
        .catch( (error)=> {
          console.log(error);
        });
  }

  setCartToZero=()=>{
     this.setState({cartProductNumbers:0})
  }

  logoutClick() {
    axios
      .delete("http://localhost:5555/api/logout", { withCredentials: true })
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

  //-----------seller form  --------------
  // handleSubmit(){

  // }

  render() {
    const { currentUser,productData, cartTotal, productArray, menProducts, womenProduct } = this.state;
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
            render={({match})=>(
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
            // onSubmit={this.handleSubmit}
            component={SellerForm}
          />
          <Route
            path="/signup-page"
            render={() => {
              return (
                <SignUpPage
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              );
            }}
          />
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

        <footer>
          <p>Made by Priyanka and Harnit at Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
