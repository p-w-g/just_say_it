import React from 'react';
import { connect } from "react-redux";
import { userName, logIn, logOut } from '../store/actions';


const NameForm = () => {
  let input

  const handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await this.nameCheck(this.state.value) ? this.signIn(event)
      : console.error("Something went wrong.")
  }

  const nameCheck = name => {
    if (!name) return alert("Missing name")
    if (name === '') return alert("Missing name")
    if (name.match(/[^A-Za-z0-9]+/g)) return alert("Invalid name, use only letters and numbers")

    return true
  }

  const signIn = async () => {
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
    // TODO: replace store.loggedin with redux.store
    // setStore({ name: this.state.value })
    this.props.dispatch(userName(this.state.value))
    this.props.dispatch(logIn())
    // TODO: replace force login with store isLoggedIn
    // this.props.forceLogin()
  }

  const nameDispatcher = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    // dispatch(addTodo(input.value))
    console.log(input.value)
    input.value = ''

  }

  return (
    <form onSubmit={nameDispatcher} class="d-flex">
      <label>
        Name:
        </label>
      <input type="text" class="breathe form-control form-control-sm" ref={node => { input = node }} />
      <input type="submit" class="breathe btn btn-outline-info btn-sm" value="Send" />
    </form>
  );

}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  userName: state.userName
});
export default connect(mapStateToProps)(NameForm);