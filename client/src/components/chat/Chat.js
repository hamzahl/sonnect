import React, { Component } from 'react';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client';

import ChatScreen from './ChatScreen'
import UsernameForm from './UsernameForm'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import WhosOnlineList from './WhosOnlineList'

class Chat extends Component {
  constructor() {
    super();

    this.state =  {
      currentScreen: 'WhatIsYourUserNameScreen',
       currentUsername: '',
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    this.setState({
       currentUsername: username,
      currentScreen: 'ChatScreen'
    });
  }

  sendMessage = (text) => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }
  render() {
    const styles = {
            container: {
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            },
            chatContainer: {
              display: 'flex',
              flex: 1,
            },
            whosOnlineListContainer: {
              width: '300px',
              flex: 'none',
              padding: 20,
              backgroundColor: '#2c303b',
              color: 'white',
            },
            chatListContainer: {
              padding: 20,
              width: '85%',
              display: 'flex',
              flexDirection: 'column',
            },
         }
    if (this.state.currentScreen === 'WhatIsYourUserNameScreen') {
          return (
      <UsernameForm onSubmit={this.onUsernameSubmitted} />
    )
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen  currentUsername={this.state. currentUsername} />
    }

  }
}

export default Chat
