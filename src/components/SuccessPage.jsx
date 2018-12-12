import React, { Component } from 'react';

class SuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        
        return ( 
            <section>
            <div className="SuccessPage">
            <h1>Successfully Order Placed </h1>
            <p>Your Id is</p>
            </div>
            </section> 
         );
        
    }
}
 
export default SuccessPage ;