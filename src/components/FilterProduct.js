 import React, { Component } from 'react';
 import CheckBox from "../components/CheckBox.js"

const size = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
];

class FilterProduct extends Component {
    constructor(props){
        super(props)
        this.state=({
            selecteCheckBox:[],
        })

}


// togglecheckbox=(label)=>{
//         if(this.selecteCheckBox.has(label)){
//             this.selecteCheckBox.delete(label);
//         } else{
//             this.selecteCheckBox.add(label);
//         }
//         this.setState({
//             selecteCheckBox:label
//         })
//     }
 
    createCheckbox=(label)=>(
    <CheckBox
        classes="filters-size"
        label={label}
        handlecheckbox={this.togglecheckbox}
        key={label}
    />
)
 createCheckBoxes = ()=>(
 size.map(this.createCheckbox)
 )

    render() { 
        return ( 
            <div className="filters">
               <h4 className="title">Sizes:</h4>
                {this.createCheckBoxes()}
            </div>

         );
    }
}
export default FilterProduct;


  

    

  
  



