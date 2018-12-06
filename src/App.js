import React, { Component } from 'react';
import {Switch,Route,NavLink} from "react-router-dom";


import './App.css';

import ProductList from "./components/ProductList.js";





class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Online Shopping</h1>
          <nav>
            <NavLink to="/product-list-man">Man</NavLink>
            <NavLink to="/product-list-women">Women</NavLink>
          </nav>
         </header>
          <Switch>
            <Route path="/product-list-man"  render={()=><ProductList category="man"/>}/>
            <Route path="/product-list-women"  render={()=><ProductList category="women"/>}/>
          </Switch>
      </div>
    );
  }
}

export default App;
