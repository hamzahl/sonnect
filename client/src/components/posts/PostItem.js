import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { deletePost, addLike, removeLike } from '../../state/actions/postActions';

class PostItem extends Component {
  onDeleteClick = (id) => {
    this.props.deletePost(id);
  }

  onLikeClick = (id) => {
    this.props.addLike(id);
  }

  onUnlikeClick = (id) =>{
    this.props.removeLike(id);
  }

  findUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  testFunc = (date) => {
    return date;
  }

  prettyDate = (postDate) => {
    const date = new Date(postDate);
    return `${date.toString()}`;
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <p className="h3 text-uppercase font-weight-bold">// {post.name}</p>
          <p className="small text-left text-muted">{this.prettyDate(post.date)} </p>
        </div>
        <div className="row">
            <p className="text-primary font-italic">{post.text}</p>
        </div>
        <div className="row">
          <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge">{post.likes.length}</span>
          </button>
          <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn mr-1"
                >
                  <i
                    className={classnames('fas fa-comment', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge">{post.likes.length}</span>
          </button>
          {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);