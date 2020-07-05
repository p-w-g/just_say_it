import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";
import LoginHandler from './components/LoginHandler'
import './App.css';

const initialState = {
  username: '',
  isLoggedIn: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      state.isLoggedIn = true
      return state
    case "LOG_OUT":
      state.isLoggedIn = false
      return state
    case "USER_NAME":
      state.userName = action.text
      return state

    default:
      return state
  }
}

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
      <LoginHandler />
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
