import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="auth-btns">
        <Button variant="outlined" component={Link} to="/register">
          Register
        </Button>
        <Button variant="outlined" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/chat">
          Chat
        </Button>
      </div>
    );
  }
}

export default App;
