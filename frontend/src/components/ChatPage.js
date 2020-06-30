import React from 'react';
import { connect } from "react-redux";
import io from 'socket.io-client'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import PostForm from './PostForm'

const socket = io()

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      open: false,
      setSnackOpen: true,
      lastLogin: ''
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.fetchAllMessages()
    this.initSocket()
  };

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleLogout() {
    this.props.forceLogout()
    this.signOut()
  }

  scrollToBottom = () => {
    if (
      document.querySelectorAll(".chat-message").length !== 0
    ) {
      document.querySelectorAll(".chat-message")[document.querySelectorAll(".chat-message").length - 1]
        .scrollIntoView({ behavior: "smooth" })
    }
  }

  signOut = async () => {
    await fetch('/api/names', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO: replace store.name with redux store
      // body: JSON.stringify({ name: store().name }),
    });
  }

  fetchAllMessages = async () => {
    const response = await fetch('/api/messages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    this.setState({ allMessages: body.dataset, isLoading: false })
  }

  initSocket = () => {
    socket.on('connect', () => {
      console.log("init of socket.io in postform");
    })

    socket.on('all-messages', (msgs) => {
      this.setState({
        allMessages: msgs.dataset
      })
    })

    socket.on('user-login', (payload) => {
      this.setState({ open: "true", lastLogin: payload.name })
      this.handleClose()
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (this.state.open) {
      setTimeout(() => {
        this.setState({ setSnackOpen: false });
        this.setState({ open: false });
      }, 6000);
    }
    this.setState({ setSnackOpen: false });
  };

  render() {
    return (
      <div class="col-lg-6 col-12 col-md-10 col-sm-12">

        <ul class="list-group list-group-flush message-feed">

          {!this.state.isLoading &&
            this.state.allMessages.map((post, index) =>
              <li class="list-group-item chat-message" key={index}>
                <h5 class="mb-1">{post.name}</h5>
                <p class="mb-1">{post.message}</p>
              </li>
            )}
        </ul>
        <PostForm />
        <form>
          <label>
            {/* TODO: replace store.name with redux.store
            logged in as  <h5 class="mb-1">{store().name}</h5> */}
          </label>
          <button class="btn btn-outline-danger btn-sm breathe" onClick={this.handleLogout}> Leave</button>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
        >
          <Alert variant="outlined" severity="info">
            {/* TODO: replace store.name with redux.store
            {this.state.lastLogin === store().name ? "You have logged in succesfully" : this.state.lastLogin + " has logged in"} */}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default connect()(ChatPage);