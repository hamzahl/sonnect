import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux'
import { registerUser } from '../../state/actions/authAction'

class Register extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
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

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <TextField
          required 
          error={ 
            (this.state.email.endsWith('.ac.uk') || 
              this.state.email.endsWith('.edu'))
            ? false : true }
          helperText={ (this.state.email.endsWith('.ac.uk') || 
              this.state.email.endsWith('.edu') || 
              this.state.email === '')
            ? '' : 'University email must be entered' }
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          onChange={this.onChange}
          value={this.state.email}
        />
        <TextField
          required
          error={false}
          helperText={''}
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={this.onChange}
          value={this.state.password}
        />
        <TextField
          error={this.state.password !== this.state.password2
                  ? true : false}
          disabled={this.state.password === ''}
          helperText={this.state.password !== this.state.password2
                  ? 'Passwords must match' : ''}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
