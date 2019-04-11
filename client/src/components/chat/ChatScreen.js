import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'

class ChatScreen extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentUser: {}
  //   }
  // }

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:893a75da-bdc6-45e3-81b2-43444a509adf',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3000/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
     })
     .catch(error => console.error('error', error))
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
        <p>Hi, {this.props.currentUsername}</p>
      </div>
    )
  }
}

export default ChatScreen