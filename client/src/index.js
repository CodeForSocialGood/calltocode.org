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

const browserHistory = createHistory()

const navigationMiddleware = routerMiddleware(browserHistory)

const loggedMiddleware = createLogger({
  predicate: (getState, action) => !action.type.includes('redux-form')
})

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(navigationMiddleware),
  applyMiddleware(loggedMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.querySelector('main')
)
