import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router-dom'

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';

import api from '../../api';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }

  async componentDidMount() {
    this.initialFetch();
  }
  async initialFetch() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.match.params.id),
      api.posts.getComments(this.props.match.params.id),
    ]);

    const user = await api.users.getSingle(post.userId);

    this.setState({
      post,
      comments,
      user,
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }
    return (
      <section name="post">
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <sectio>
          {this.state.comments
          .map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </sectio>
      </section>
    );
  }
}

Post.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.number,
  }),
};

Post.defaultProps = {
  match: {
    id: 1,
  },
};

export default Post;
