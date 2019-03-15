import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../state/actions/authAction';
import { withStyles } from '@material-ui/core';
// import { clearCurrentProfile } from '../../state/actions/profileActions'

class Navbar extends Component {
  onLogoutclick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  
  render() {
    // const styles = {
    //   root: {
    //     flexGrow: 1
    //   },
    //   grow: {
    //     flexGrow: 1
    //   }
    // }


    const { isAuthenticated, user } = this.props.auth;
    const authenticatedNav = (
        // <AppBar position="static">
        //   <Toolbar>
        <Paper>
        <Button 
          variant="outlined" 
          component={Link} to="/chat">
          Chat
        </Button>
            <Button 
              variant="outlined"
              onClick={this.onLogoutclick}
            >
              Logout
            </Button>          
        </Paper>

        //   </Toolbar>
        // </AppBar>
    );

    const guestNav = (
      <Paper>
        <Button 
          variant="outlined"
          component={Link} to="/"
        >
          Home
        </Button>
        <Button 
          variant="outlined"
          component={Link} to="/register"
        >
          Register
        </Button>
        <Button 
          variant="outlined"
          component={Link} to="/login"
        >
          Login
        </Button>
      </Paper>
      /* <AppBar>
        <Button 
          variant="outlined"
          component={Link} to="/"
        >
          Home
        </Button>
        <Button 
          variant="outlined"
          component={Link} to="/register"
        >
          Register
        </Button>
        <Button 
          variant="outlined"
          component={Link} to="/login"
        >
          Login
        </Button>
      </AppBar> */
    );
    console.log(isAuthenticated);
    return (
      <Paper>
        {isAuthenticated ? authenticatedNav : guestNav}
      </Paper>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
