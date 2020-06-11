import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NameForm></NameForm>
      </div >
    );
  }
};
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ value: event.target.value }); }
  handleSubmit = async (event) => {
    event.preventDefault();

    await this.nameCheck(this.state.value) ? this.signIn(event)
      : console.error("Something went wrong.")
  }

  nameCheck = name => {
    if (!name) return alert("Missing name")
    if (name === '') return alert("Missing name")
    if (name.match(/[^A-Za-z0-9]+/g)) return alert("Invalid name, use only letters and numbers")
    return true
  }
  signIn = async e => {
   const response = await fetch('/api/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.value }),
    });
    const body = await response.json();
    if (body.response === 'Username Already Taken') {
      return alert('Username Already Taken')
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
