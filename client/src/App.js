import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Provider} from "react-redux";
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import ListOfProjects from './components/ListOfProjects/ListOfProjects'
import Profile from './components/Profile/Profile'
import restricted from './components/Restricted/Restricted'

function App() {
  return (
    <div>
      <Header />
      <Provider store={store}>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignupForm} />
          <Route path='/profile' component={restricted(Profile)} />
          <Route path='/forgot-password' component={ForgotPasswordForm} />
          <Route path='/' component={ListOfProjects} />
        </Switch>
      </Provider>
    </div>
  )
}

export default App
