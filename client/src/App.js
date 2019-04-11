import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import setAuthToken from './util/setAuthToken'
import { setCurrentUser } from './state/actions/authAction'

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Private routing
import PrivateRoute from './components/common/PrivateRoute';


// Componenets
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Friends from './components/friends/Friends';
import Posts from './components/posts/Posts'

import Login from './components/auth/Login';
import Chat from './components/chat/Chat';
import Message from './components/message/Message';
import NotFound from './components/not-found/NotFound';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/chat" component={Chat} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/friends" component={Friends} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
          </div> 
        </Router>        
      </Provider>

    );
  }
}

export default App;
