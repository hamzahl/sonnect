import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { loginUser } from '../../state/actions/authAction'
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

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userCredentials);
  }



  render() {
    const { errors } = this.state;
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login)
