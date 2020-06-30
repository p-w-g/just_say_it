import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";
import LoginHandler from './components/LoginHandler'
import './App.css';
import { userName, logIn, logOut } from './store/actions';

const initialState = {
  username: '',
  isLoggedIn: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return { isLoggedIn: true }
    case "LOG_OUT":
      return { isLoggedIn: false }
    case "USER_NAME":
      return { userName: action.text }

    default:
      return state
  }
}

const store = createStore(reducer)
// console.log
const unsubscribe = store.subscribe(() => console.log(store.getState()))
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
