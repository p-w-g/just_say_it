import React from 'react';
import { useStore } from '../Store'
import io from 'socket.io-client'


const [store, setStore] = useStore();
const socket = io()

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
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
    console.log()
    document.querySelectorAll(".chat-message")[document.querySelectorAll(".chat-message").length - 1].scrollIntoView({ behavior: "smooth" })
  }

  signOut = async () => {
    await fetch('/api/names', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: store().name }),
    });
  }

  fetchAllMessages = async () => {
    const response = await fetch('/api/messages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    this.setState({ allMessages: body.dataset, isLoading: false })
    await this.scrollToBottom()
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
  }

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
            logged in as  <h5 class="mb-1">{store().name}</h5>
          </label>
          <button class="btn btn-outline-danger btn-sm breathe" onClick={this.handleLogout}> Leave</button>
        </form>

      </div>
    );
  }
}

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ value: event.target.value }); }
  handleSubmit = async (event) => {
    event.preventDefault();

    await this.postThePost()

    document.querySelector('#chat-input').value = '';
    // await this.postCheck(this.state.value) ? this.postThePost() : console.error("Something went wrong.")
  }

  postCheck = content => {
    if (!content) return alert("Missing content")
    if (content === '') return alert("Missing content")
    // if (content.match(/[^A-Za-z0-9,.& ']+/g)) return alert("Only alphanumeric characters and: , ' &")

    return true
  }

  initSocket = () => {
    socket.on('connect', () => {
      console.log("init of socket.io in postform");
    })
  }

  componentDidMount() {
    this.initSocket()
  };

  postThePost = async content => {
    socket.emit('chat message', ({ name: store().name, message: this.state.value }))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="">
        <label>
          <input class="form-control form-control-sm" onChange={this.handleChange} id="chat-input" />
        </label>
        <input type="submit" value="Send" class="btn btn-outline-info btn-sm btn-fix" />
      </form>
    );
  }
}

export default ChatPage;