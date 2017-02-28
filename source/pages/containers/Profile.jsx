import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Profile extends Component {
  render() {
    return (
      <section name="Profile">
        <h1>Profile</h1>
        <Link to="/nowhere">
          Go to a random page
        </Link>
      </section>
    );
  }
}

export default Profile;
