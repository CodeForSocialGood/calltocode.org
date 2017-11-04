import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Provider} from "react-redux";
import Header from './components/Header/Header'
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import ListOfProjects from './components/ListOfProjects/ListOfProjects'
import store from "./data/store";

function App() {
  return (
    <div>
      <Header />
      <Provider store={store}>
        <Switch>
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/' component={ListOfProjects}/>
        </Switch>
      </Provider>
    </div>
  )
}

export default App
