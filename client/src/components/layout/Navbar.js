import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Paper>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" component={Link} to="/" />
        <Tab label="Register" component={Link} to="/register" />
        <Tab label="Login" component={Link} to="/login" />
      </Tabs>
    </Paper>
      )
  }
}

export default Navbar
