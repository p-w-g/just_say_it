import React, { Component } from 'react';
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
      <div>
        {
          this.state.isLoggedIn ? <ChatPage />
            : <NameForm forceLogin={this.handleLoginClick.bind(this)} />
        }
      </div>
    );
  }
}


export default LoginHandler;