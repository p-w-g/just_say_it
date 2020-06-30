import React, { Component } from 'react';
import { connect } from "react-redux";
import NameForm from './NameForm'
import ChatPage from './ChatPage'

class LoginHandler extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div class="container-fluid d-flex justify-content-center align-items-center">
        {
          this.state.isLoggedIn ? <ChatPage forceLogout={this.handleLogoutClick.bind(this)} />
            : <NameForm forceLogin={this.handleLoginClick.bind(this)} />
        }

      </div >
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
})

export default connect()(LoginHandler);