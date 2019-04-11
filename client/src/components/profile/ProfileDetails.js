import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../util/isEmpty';

class ProfileDetails extends Component {
  render() {
    const { profile } = this.props;
    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{profile.user.name}'s Profile</h3>
            <p className="lead">{profile.course}, {profile.university}</p>
            <p className="text-muted">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
