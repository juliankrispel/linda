import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Project from './components/Project';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Project} />
  </Route>
);
