import React, { Component } from 'react';

class ChatPage extends React.Component {
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
    );
  }
}
// class EssayForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: 'Please write an essay about your favorite DOM element.' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) { this.setState({ value: event.target.value }); }
//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Essay:
//           <textarea value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export default ChatPage;