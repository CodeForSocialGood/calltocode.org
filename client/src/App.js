import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import restricted from './components/Restricted/Restricted'

function App () {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignupForm}/>
        <Route path='/profile' component={restricted(Profile)}/>
        <Route path='/forgot-password' component={ForgotPasswordForm}/>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  )
}

export default App
