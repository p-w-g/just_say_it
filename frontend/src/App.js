import React, { Component } from 'react';
import LoginHandler from './components/LoginHandler'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="App">
        <LoginHandler />
      </div >
    );
  }
};


export default App;
