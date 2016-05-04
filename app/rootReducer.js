import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';

// reducers
import project from './components/Project/reducer';

const rootReducer = combineReducers({
  project,
  routing
});

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default createStore(rootReducer, enhancer);
