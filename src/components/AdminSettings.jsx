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
      .get(`http://localhost:5555/api/all-users`, {
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
        `http://localhost:5555/api/user/${id}`,
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
      <section>
        <h1>Admin Settings</h1>
        {users.map(oneUser => {
          return (
            <ul>
              <li key={oneUser._id}>
                <h1>{oneUser.fullName}</h1>
                <p>{oneUser.role}</p>
                <p>{oneUser.email}</p>
                <button
                  onClick={() => {
                    this.changeRole("admin", oneUser._id);
                  }}
                >
                  Set Admin
                </button>
                <button
                  onClick={() => {
                    this.changeRole("seller", oneUser._id);
                  }}
                >
                  Set Seller
                </button>
              </li>
            </ul>
          );
        })}
      </section>
    );
  }
}

export default AdminSettings;
