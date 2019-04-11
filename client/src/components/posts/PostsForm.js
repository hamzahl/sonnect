import React, { Component } from 'react';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';

import { addPost } from '../../state/actions/postActions';
import { connect } from 'react-redux';

class PostsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name
    }

    this.props.addPost(newPost);
    this.setState( {text: ''});
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value } )
  }

  render() {
    console.log(this.props)
    const { errors } = this.state;
    return (
        <div className="card card-body mb-3">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="What's on your mind?"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
        </div>
    )
  }


}

PostsForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostsForm);