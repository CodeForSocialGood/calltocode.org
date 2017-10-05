import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

// Create a browser History
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const logger = createLogger({
  // predicate: (getState, action) => !action.type.contains('redux-form')
  predicate: (getState, action) => action.type.indexOf('redux-form') === -1
})

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  applyMiddleware(logger)
)

ReactDOM.render(
  // <Provider store={createStoreWithMiddleware(rootReducer)}>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.querySelector('main'))
