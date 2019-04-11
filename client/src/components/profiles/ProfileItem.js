import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../util/isEmpty';
import axios from 'axios';

class ProfileItem extends Component {
  addFriendClick = (currentUserId , id) => {
    axios
    .get(`/api/friends/${currentUserId}${id}`)
    .then(res =>{
      console.log(res.data);
    })
  }

  render() {
    const { profile } = this.props;
    console.log(this.props);
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{profile.user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{profile.university}</h6>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
          </Link>
          <button
            className="btn btn-info"
            onClick={this.addFriendClick.bind(this, profile.user._id)}>
              Add Friend
          </button>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   profile: state.profile,
//   auth: state.auth
// });

export default ProfileItem;