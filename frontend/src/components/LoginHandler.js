import React, { Component } from 'react';
import { connect } from "react-redux";
import NameForm from './NameForm'
import ChatPage from './ChatPage'
import { useStore } from 'react-redux'


const LoginHandler = () => {
  const store = useStore()
  console.log(store.getState())
  return <div class="container-fluid d-flex justify-content-center align-items-center">
    {
      store.getState().isLoggedIn ? <ChatPage />
        : <NameForm />
    }
  </div>
}

export default connect()(LoginHandler);