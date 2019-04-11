import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// custom components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

// state
import { createProfile } from '../../state/actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      university: '',
      course: '',
      bio: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      university: this.state.university,
      course: this.state.course,
      bio: this.state.bio,
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // options available for university
    const universityOptions = [
      { label: '* Select your university', value: 0 },
      { label: 'De Montfort University (DMU)', value: 'De Montfort University' },
    ];

    // Options available for course 
    const courseOptions = [
      { label: '* Select your course', value: 0 },
      { label: 'Computer Science (BSc)', value: 'Computer Science' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile"
                />
                <SelectListGroup
                  placeholder="University"
                  name="university"
                  value={this.state.university}
                  onChange={this.onChange}
                  options={universityOptions}
                  error={errors.university}
                  info="What university are you attending?"
                />
                <SelectListGroup
                  placeholder="Course"
                  name="course"
                  value={this.state.course}
                  onChange={this.onChange}
                  options={courseOptions}
                  error={errors.status}
                  info="Select your the course you're studying"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);