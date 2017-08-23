import React from "react";
import autoBind from "react-autobind";

import {connect} from "react-redux";
import * as actionCreators from "../actions";

import Signup from "../components/signup.js";

class SignupContainer extends React.Component {
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
    this.props.signup(username, password);
    this.props.toggleModal("isShowingSignup");
    this.setState({
      username: "",
      password: ""
    });
  }
  render() {
    return (
      <Signup input={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, actionCreators)(SignupContainer);
