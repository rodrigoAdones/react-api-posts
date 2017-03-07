import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import api from '../../api';

import styles from './Page.css';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    this.initialFetch();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  async initialFetch() {
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });

    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeigth = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeigth + 100 >= fullHeight)) {
      return null;
    }
    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (e) {
        // console.log(e);
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <section name="Home" className={styles.section}>
        <h1><FormattedMessage id="title.home" /></h1>
        <section className={styles.list}>
          {this.state.posts
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

export default Home;
