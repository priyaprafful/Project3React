import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         
            
         }
    }
    render() { 
       return ( 
            <section>
            <div className="SuccessPage">
                <h1><b>Successfully Order Placed </b> </h1>
                <Link to="/home"><button className="go-to-home-button">Go To Home</button></Link>
            </div>
            </section> 
         );
        
    }
}
 
export default SuccessPage ;