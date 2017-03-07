import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';

import api from '../../api';

import Loading from '../../shared/components/Loading';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.initialFetch();
  }
  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <section name="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>

        <fieldset>
          <legend><FormattedMessage id="profile.field.basic" /></legend>
          <input type="email" value={this.state.user.email} disabled />
        </fieldset>

        {this.state.user.address && (
          <fieldset>
            <legend><FormattedMessage id="profile.field.address" /></legend>
            <address>
              {this.state.user.address.street}
              {this.state.user.address.suit}
              {this.state.user.address.city}
              {this.state.user.address.zipcode}
            </address>
          </fieldset>
        )}
        <section>
          {this.state.posts
            .map(post => (
              <Post key={post.id} {...post} user={this.state.user} />
            ))
          }
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  match: {
    params: {
      id: 1,
    },
  },
};

export default Profile;
