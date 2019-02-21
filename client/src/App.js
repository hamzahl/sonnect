import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './util/setAuthToken'
import { setCurrentUser } from './state/actions/authAction'

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Chat from './components/chat/Chat';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing}/>
            <div>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/chat" component={Chat}/>
            </div>
          </div>
        </Router>        
      </Provider>

    );
  }
}

export default App;
