import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import api from '../../api';
import actions from '../../actions';

import styles from './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    await this.initialFetch();
  }
  async initialFetch() {
    if (!!this.props.user && !!this.props.comments) return this.setState({ loading: false });
    // const [
    //   user,
    //   comments,
    // ] = await Promise.all([
    //   !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
    //   !this.state.comments ? api.posts.getComments(this.props.userId) : Promise.resolve(null),
    // ]);
    await Promise.all(
      [
        this.props.actions.loadUser(this.props.userId),
        this.props.actions.loadCommentsForPost(this.props.id),
      ],
    );

    return this.setState({
      loading: false,
    });
  }
  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <h2 className={styles.title}>
          <Link to={`/post/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <p className={styles.body}>
          {this.props.body}
        </p>
        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.props.user.id}`}>
              {this.props.user.name}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.length,
                }}
              />
            </span>
            <Link to={`post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  // userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  comments: PropTypes.arrayOf(PropTypes.object),
};

Post.defaultProps = {
  id: 1,
  userId: 1,
  title: 'Default Value',
  body: null,
  user: null,
  comments: null,
};

function mapStateToProps(state, props) {
  // console.log(state);
  return {
    user: state.user[props.userId],
    comments: state.comments.filter(comment => comment.postId === props.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
