import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ListOfProjects from './components/ListOfProjects/ListOfProjects'

function App () {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={ListOfProjects} />
      </Switch>
    </div>
  )
}

export default App
