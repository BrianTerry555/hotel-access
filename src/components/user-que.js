import React from "react";
import UserAdd from "./user-add.js";


class UserQue extends React.Component {
  genUsers() {
    return this.props.users.map((item, index) => {
      return (
        <UserAdd token={this.props.token} handleAdd={this.props.handleAdd} key={item.username + index} user={item} />
      )
    })
  }
  render() {
    return (
      <div style={{display: this.props.priv === "admin" ? "inherit": "none"}}>
        <h5>New User Que</h5>
        {this.genUsers()}
      </div>
    )
  }
}


export default UserQue;
