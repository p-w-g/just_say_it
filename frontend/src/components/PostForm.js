import React from 'react';
import io from 'socket.io-client'

const socket = io()

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
    })
  }

  componentDidMount() {
    this.initSocket()
  };

  postThePost = async content => {
    // TODO: replace store.name with redux.store
    // socket.emit('chat message', ({ name: store().name, message: this.state.value }))
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


export default PostForm;