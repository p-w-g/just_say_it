import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

  }
  componentDidMount() {
    this.fetchAllMessages()
  };


  fetchAllMessages = async () => {
    const response = await fetch('/api/messages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    this.setState({ allMessages: body.dataset, isLoading: false })
  }

  render() {
    return (
      <div className="App">

        <p>Here be my messages</p>
        <p>if I had any</p>
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
        </div>


      </div>
    );
  }
};

export default App;
