import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'

import localStorageMiddleware from './middleware/localStorageMiddleware'
import promiseMiddleware from './middleware/promiseMiddleware'

import './scss/main.scss'
import App from './App'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const browserHistory = createHistory()
const navigationMiddleware = routerMiddleware(browserHistory)
const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type && !action.type.includes('redux-form')
})

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(
      navigationMiddleware,
      loggerMiddleware,
      promiseMiddleware,
      thunkMiddleware,
      localStorageMiddleware
    )
  )
)

const theme = createMuiTheme()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('main')
)

export default store
