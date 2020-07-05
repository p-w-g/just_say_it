import React, { useState, useEffect } from 'react';
import { connect, useStore } from "react-redux";
import io from 'socket.io-client'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { logOut } from '../store/actions';

const socket = io()

const ChatPage = ({ dispatch }) => {

  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(true);
  const [allMessages, setAllMessages] = useState('');

  const store = useStore()
  const storedName = store.getState().userName
  const name = storedName

  let lastLogin = ''

  useEffect(() => {
    initSocket()
    fetchAllMessages()
    scrollToBottom()
  }, [])

  const handleLogout = () => {
    dispatch(logOut())
    signOut()
  }

  const signOut = async () => {
    await fetch('/api/names', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
  }

  const scrollToBottom = () => {
    if (
      document.querySelectorAll(".chat-message").length !== 0
    ) {
      document.querySelectorAll(".chat-message")[document.querySelectorAll(".chat-message").length - 1]
        .scrollIntoView({ behavior: "smooth" })
    }
  }

  const fetchAllMessages = async () => {
    const response = await fetch('/api/messages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    setAllMessages(body.dataset)
    setLoading(false)
  }

  const initSocket = () => {
    socket.on('connect', () => {
      console.log("init of socket.io in postform");
    })

    socket.on('all-messages', (msgs) => {
      setAllMessages(msgs.dataset)
      scrollToBottom()
    })

    socket.on('user-login', (payload) => {
      setOpen(true)
      setSnackOpen(true)
      lastLogin = payload.name
      handleClose()
    })
  }

  const postThePost = async content => {
    socket.emit('chat message', ({ name: name, message: document.querySelector('#chat-input').value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await postThePost()

    document.querySelector('#chat-input').value = '';
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if ({ open }) {
      setTimeout(() => {
        setOpen(false)
        setSnackOpen(false)
      }, 6000);
    }
    setSnackOpen(false)
  };

  return (
    <div class="col-lg-6 col-12 col-md-10 col-sm-12">

      <ul class="list-group list-group-flush message-feed">

        {!isLoading &&
          allMessages.map((post, index) =>
            <li class="list-group-item chat-message" key={index}>
              <h5 class="mb-1">{post.name}</h5>
              <p class="mb-1">{post.message}</p>
            </li>
          )}
      </ul>
      <form onSubmit={handleSubmit} class="">
        <label>
          <input class="form-control form-control-sm" id="chat-input" />
        </label>
        <input type="submit" value="Send" class="btn btn-outline-info btn-sm btn-fix" />
      </form>
      <form>
        <label>
          Logged in as  <h5 class="mb-1">{name}</h5>
        </label>
        <button class="btn btn-outline-danger btn-sm breathe" onClick={handleLogout}> Leave</button>
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
      >
        <Alert variant="outlined" severity="info">
          {name === lastLogin ? "You have logged in succesfully" : name + " has logged in"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect()(ChatPage);