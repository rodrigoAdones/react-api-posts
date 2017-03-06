import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      <Header />
      <Switch>
        {/* Main Page*/}
        <Route
          path="/"
          exact
          component={Home}
        />
        {/* Watch a post*/}
        <Route
          path="/post/:id"
          exact
          component={Post}
        />
        {/* Watch user profile*/}
        <Route
          path="/user/:id"
          exact
          component={Profile}
        />
        <Route component={Error404} />
      </Switch>
    </main>
  );
}

export default Pages;
