import React from 'react';
import { connect, useSelector } from "react-redux";

import NameForm from './NameForm'
import ChatPage from './ChatPage'

const LoginHandler = () => {

  const logState = useSelector(state => state.isLoggedIn)
  return (
    <div class="container-fluid d-flex justify-content-center align-items-center" >
      {
        logState ? <ChatPage />
          : <NameForm />
      }
    </div >
  )

}

export default connect()(LoginHandler);