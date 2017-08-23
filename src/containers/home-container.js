import React from "react";
import autoBind from "react-autobind";

import {connect} from "react-redux";
import * as actionCreators from "../actions";

import LoginContainer from "./login-container.js";
import SignupContainer from "./signup-container.js";
import UserQueContainer from "./user-que-container.js";

import Events from "../components/events.js";
import Guests from "../components/guests.js";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(251, 251, 251, 0.75)'
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingLogin: false,
      isShowingSignup: false
    };
    autoBind(this);
  }
  componentWillMount() {
    this.props.loadEvents();
  }
  componentDidUpdate() {
    if (this.props.guests.length === 0 && this.props.token) {
      this.props.loadGuests(this.props.token);
    }
  }
  toggleModal(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isShowingSignup} onRequestClose={() => {
          this.toggleModal("isShowingSignup");
        }} style={customStyles} contentLabel="Signup">
          <SignupContainer toggleModal={this.toggleModal}/>
        </Modal>
        <button onClick={() => {
          this.toggleModal("isShowingSignup")
        }}>Signup</button>

        <Modal isOpen={this.state.isShowingLogin} onRequestClose={() => {
          this.toggleModal("isShowingLogin");
        }} style={customStyles} contentLabel="Login">
          <LoginContainer toggleModal={this.toggleModal}/>
        </Modal>

        <button onClick={() => {
          this.toggleModal("isShowingLogin")
        }}>Login</button>


        <Events events={this.props.events}/>
        <Guests token={this.props.token} guests={this.props.guests}/>
        <UserQueContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, actionCreators)(HomeContainer);
