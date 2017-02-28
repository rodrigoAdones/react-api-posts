import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <section name="Error">
        <h1>Page Not Found</h1>
        <Link to="/">
          Go to Home
        </Link>
      </section>
    );
  }
}

export default Home;
