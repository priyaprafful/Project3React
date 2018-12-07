import React, { Component } from 'react';

class CheckBox extends Component {
  
    render() {
    const { label } = this.props;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            value={label}
            />
            <span className="checkMark">{label}</span>
        </label>
      </div>
    );
  }
}




export default CheckBox;