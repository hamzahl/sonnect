import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(newUser);
  }



  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          required
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          value={this.state.email}
          onChange={this.onChange}
        />
        <TextField
          required
          label="Password"
          type="password"
          name="password"
          margin="normal"
          value={this.state.password}
          onChange={this.onChange}
        />
        <Button 
          type="submit"
          variant="contained">
          Submit
        </Button>
      </form>
    )
  }
}

export default Login
