import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import PostBody from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/Loading.jsx'

import api from '../../api.js'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: []
    }
  }

  async componentDidMount () {
    const [
      post,
      comments
    ] = await Promise.all([
      api.posts.getSingle(this.props.match.params.id),
      api.posts.getComments(this.props.match.params.id)
    ])

    const user = await api.users.getSingle(post.userId)

    this.setState({
      post,
      comments,
      user,
      loading: false
    })
  }
  render () {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    return (
      <section name='post'>
        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
      </section>
    )
  }
}

export default Post
