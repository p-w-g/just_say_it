import React from 'react';

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
  handleSubmit(event) {
    alert('Pushed this: ' + this.state.value);
    event.preventDefault();
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