import React from "react";
import autoBind from "react-autobind";

class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: ""
    }
    autoBind(this);
  }
  handleChange(event) {
    this.setState({selected: event.target.value});
  }
  render() {
    return (
      <div>
        <p>{this.props.user.username}</p>
        <select value={this.state.selected} onChange={this.handleChange}>
          <option value="">Select Privilage</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button onClick={() => {
            console.log(this.props.token)
            this.props.handleAdd(this.props.user.username, this.state.selected, this.props.token);
          }}>Add User</button>
        <button>Remove User</button>
      </div>
    )
  }
}

export default UserAdd;
