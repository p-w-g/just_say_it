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

  handleLogout() {
    this.props.forceLogout()
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
  }

  render() {
    return (
      <div >
        {!this.state.isLoading &&
          this.state.allMessages.map((post, index) =>
            <article key={index}>
              <h3>
                {post.name}
              </h3>
              <p>
                {post.message}
              </p>
            </article>
          )}
        <PostForm />
        <button onClick={this.handleLogout}> Let Me Out!</button>
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ChatPage;