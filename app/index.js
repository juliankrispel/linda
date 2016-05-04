import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import root from './rootReducer';
import './app.global.css';

const history = syncHistoryWithStore(hashHistory, root);

render(
  <Provider store={root}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
