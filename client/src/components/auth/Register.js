import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
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
      password2: this.state.password2,
    }
    
    axios.post('/api/users/register', newUser)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          onChange={this.onChange}
          value={this.state.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={this.onChange}
          value={this.state.password}
        />
        <TextField
          required
          label="Confirm Password"
          type="password"
          name="password2"
          margin="normal"
          onChange={this.onChange}
          value={this.state.password2}
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

export default Register;
