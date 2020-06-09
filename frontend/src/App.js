import React, { Component } from 'react';
import './App.css';

const staticPosts = [{
  name: 'anon1',
  message: 'lorem ipsum dolor sit amet'
},
{
  name: 'anon2',
  message: 'lorem ipsum dolor sit amet'
},
{
  name: 'anon3',
  message: 'lorem ipsum dolor sit amet'
},
{
  name: 'anon1',
  message: 'lorem ipsum dolor sit amet'
}]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { allMessages: 'this is bullshit' };
  }

  // componentWillMount() {

  //   this.callExpress()
  //     .then(res =>
  //       this.setState({ allMessages: res.dataset })
  //     )
  //     .catch(err => console.error(err));
  // }

  componentWillMount() {
    this.setState({ allMessages: staticPosts })
    this.setState({ comment: 'Hello' });

  }
  componentDidMount() {
    this.setAnotherState()
    console.log("state after mount: ", this.state)
  };

  callExpress = async () => {
    const response = await fetch('/api/messages');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  setAnotherState() {
    this.setState({ newMessages: 'Iono habla espagnol' });
  }

  render() {
    return (
      <div className="App">


        <div >
          {this.state.allMessages.map((post, index) =>
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
