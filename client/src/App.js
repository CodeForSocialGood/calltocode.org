import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { APP_LOAD } from './actions/types'
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import restricted from './components/Restricted/Restricted'
import api from './api'

class App extends Component {
  componentWillMount () {
    this.loadExistingSessionAndUser()
  }

  loadExistingSessionAndUser () {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      api.setToken(token)
    }
    this.props.onLoad(token ? api.user.current() : null)
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/profile' component={restricted(Profile)}/>
          <Route path='/forgot-password' component={ForgotPasswordForm}/>
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onLoad: (payload) =>
      dispatch({ type: APP_LOAD, payload })
  }
}

App.propTypes = {
  onLoad: PropTypes.func
}

export default connect(null, mapDispatchToProps)(App)
