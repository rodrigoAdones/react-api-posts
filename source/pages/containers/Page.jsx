import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home.jsx'
import Post from './Post.jsx'
import Profile from './Profile.jsx'
import Error404 from './Error404.jsx'

function Pages () {
  return (
    <main role='application'>
      <Switch>
        {/* Main Page*/}
        <Route
          path='/'
          exact
          component={Home}
        />
        {/* Watch a post*/}
        <Route
          path='/post/:id'
          exact
          component={Post}
        />
        {/* Watch user profile*/}
        <Route
          path='/user/:id'
          exact
          component={Profile}
        />
        <Route component={Error404}/>
      </Switch>
    </main>
  )
}

export default Pages
