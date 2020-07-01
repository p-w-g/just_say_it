import React from 'react';
import { connect } from "react-redux";
import { userName, logIn } from '../store/actions';


const NameForm = ({ dispatch }) => {
  let input

  const nameDispatcher = async e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }

    const response = await fetch('/api/names', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: input.value }),
    });
    const body = await response.json();

    if (body.response === 'Username Already Taken') {
      return alert('Username Already Taken')
    }

    dispatch(userName(input.value))
    dispatch(logIn())
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

export default connect()(NameForm);