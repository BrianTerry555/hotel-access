import React from "react";
import autoBind from "react-autobind";

import {connect} from "react-redux";
import * as actionCreators from "../actions";

import Login from "../components/login.js";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
    autoBind(this);
  }
  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }
  handleSubmit(username, password) {
    this.props.login(username, password);
    this.props.toggleModal("isShowingLogin");
    this.setState({
      username: "",
      password: ""
    });
  }
  render() {
    return (
      <Login input={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);
