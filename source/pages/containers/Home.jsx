import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import api from '../../api';

import styles from './Page.css';

import actions from '../../actions';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount() {
    await this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  async initialFetch() {
    await this.props.actions.postNextPage();
    this.setState({ loading: false });
  }
  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }
    return this.setState({ loading: true }, async () => {
      try {
        // const posts = await api.posts.getList(this.props.page);
        //
        // this.props.actions.setPost(posts);
        await this.props.actions.postNextPage();

        this.setState({ loading: false });
      } catch (e) {
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <section name="Home" className={styles.section}>
        <h1><FormattedMessage id="title.home" /></h1>
        <section className={styles.list}>
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)
          }
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  actions: null,
  posts: [],
};

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
