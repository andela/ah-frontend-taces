import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import toggleLandingPageReducer from './toggleLandingPageReducer';
import toggleModalReducer from './toggleModalReducer';
import authReducer from './loginReducer';
import passwordResetReducer from './passwordResetReducer';

// combine all reducers into one root reducer
const rootReducer = combineReducers({
  landingReducer: toggleLandingPageReducer,
  modalReducer: toggleModalReducer,
  isAuthentic: authReducer,
  loading: passwordResetReducer,
});

// creates a store
/* eslint no-underscore-dangle: 0 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
