import React, { Component } from "react";
import axios from "axios";

class AdminSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // const { params } = this.props.match;
    console.log("inside mount");
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/api/all-users`, {
        withCredentials: true
      })
      .then(response => {
        console.log("USER  Details", response.data);
        this.setState({ users: response.data });
        console.log("users", this.state.users);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on ADMIN SETTINGS PAGE.");
      });
  }

  changeRole(role, id) {
    axios
      .put(
        process.env.REACT_APP_SERVER_URL + `/api/user/${id}`,
        { userRole: role },
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("USER  Details", response.data);
        this.setState({ users: response.data });
        console.log("users", this.state.users);
      })
      .catch(err => {
        console.log("Phone Details", err);
        alert("Sorry! Something went wrong on ADMIN SETTINGS PAGE.");
      });
  }

  render() {
    const { users } = this.state;
    return (
      <section className="AdminSettingpg">
        <h1>Admin Settings</h1>
        {users.map(oneUser => {
          return (
    

            
            <div className="AdminSettingpgone">
              <div key={oneUser._id}>
                <h1><b>Full Name:</b>  {oneUser.fullName}</h1>
                <h4><b>Role :</b> {oneUser.role}</h4>
                <h4><b>Email :</b>{oneUser.email}</h4>
                <button className="button is-primary adminbtn"
                  onClick={() => {
                    this.changeRole("admin", oneUser._id);
                  }}
                >
                  Set Admin
                </button>
                <button className="button is-success sellerbtn"
                  onClick={() => {
                    this.changeRole("seller", oneUser._id);
                  }}
                >
                  Set Seller
                </button>
              
              </div>
            
            </div>
            
            
          );
        })}
      </section>
    );
  }
}

export default AdminSettings;
