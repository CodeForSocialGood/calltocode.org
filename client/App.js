import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthActionCreator from './actions/auth'
import CreateProjectForm from './components/CreateProjectForm/CreateProjectForm'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import LoginForm from './components/LoginForm/LoginForm'
import Profile from './components/Profile/Profile'
import restricted from './components/Restricted/Restricted'
import SignupForm from './components/SignupForm/SignupForm'
import Version from './components/Version/Version'

class App extends Component {
  componentDidMount () {
    this.props.appLoad()
  }

  renderAppLoaded () {
    return (
      <div>
        <Header />
        <Version />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/create-project' component={CreateProjectForm}/>
          <Route path='/forgot-password' component={ForgotPasswordForm}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/profile' component={restricted(Profile)}/>
          <Route path='/signup' component={SignupForm}/>
        </Switch>
      </div>
    )
  }

  renderAppNotLoaded () {
    return (
      <Header />
    )
  }

  render () {
    return this.props.appLoaded
      ? this.renderAppLoaded()
      : this.renderAppNotLoaded()
  }
}

function mapStateToProps (state) {
  return {
    appLoaded: state.common.appLoaded
  }
}

const mapDispatchToProps = {
  appLoad: AuthActionCreator.appLoad
}

App.propTypes = {
  appLoad: PropTypes.func,
  appLoaded: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
