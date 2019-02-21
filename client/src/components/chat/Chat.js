import React, { Component } from 'react';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client';

import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import WhosOnlineList from './WhosOnlineList'

class Chat extends Component {
  constructor() {
    super();

    this.state =  {
      currentUserName: '',
      currentUser: {},
      currentRoom: {},
      messages: []
    }
  }

  sendMessage = (text) => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }

  componentDidMount = () => {
    console.log('mounted');
    axios
      .post('/api/users/chat', {
        email: 'hamzah_97@hotmial.com'
      })
    const tokenProvider = new Chatkit.TokenProvider({
      url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/893a75da-bdc6-45e3-81b2-43444a509adf/token`
    })
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:893a75da-bdc6-45e3-81b2-43444a509adf",
      userId: 'admin',
      tokenProvider
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          currentUser
        });
        return currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          },
          onPresenceChange: () => this.forceUpdate(),
        })
        .then(currentRoom => {
          this.setState({ currentRoom })
        })
        .catch(err => console.error('error', err))

      })
      .catch(err => console.error('error', err));

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
    return (
      <div style={styles.container}>
              <div style={styles.chatContainer}>
                <aside style={styles.whosOnlineListContainer}>
                  <h2>Who's online PLACEHOLDER</h2>
                </aside>
                <section style={styles.chatListContainer}>
                  <h2>{this.state.currentUser.name}</h2>
                  <MessageList 
                    messages={this.state.messages}
                    styles={styles.chatList}
                  />
                  <SendMessageForm 
                    onSubmit={this.sendMessage}
                  />
                </section>
              </div>
      </div>
    )
  }
}

export default Chat
