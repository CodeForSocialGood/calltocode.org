import styles from './Login.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import { push } from 'react-router-redux'
import { login } from '../../actions'

import credentials from '../../data/login'

class Login extends Component {
  renderEmail (field) {
    return (
      <div className={styles.inputRow}>
        <input
          className={styles.inputEmail}
          type="text"
          placeholder="Email"
          {...field.input}
        />
      </div>
    )
  }

  renderPassword (field) {
    return (
      <div className={styles.inputRow}>
        <input className={styles.inputPassword} type="password" placeholder="Password" {...field.input}/>
      </div>
    )
  }

  onSubmit (values) {
    this.props.login()
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1 className={styles.title}>Login</h1>

        <Field
          name="email"
          component={this.renderEmail}
        />
        <Field
          name="password"
          component={this.renderPassword}
        />
        <button type="submit" className={styles.buttonSubmit}>Submit</button>
      </form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func
}

function validateEmailAndPassword (values) {
  const errors = {}
  if (values.email !== credentials.email) {
    errors.email = `Email should be ${credentials.email}`
  }
  if (values.password !== credentials.password) {
    errors.password = `Password should be ${credentials.password}`
  }
  return errors
}

const LoginForm = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/')),
  validate: validateEmailAndPassword
})(Login)

export default connect(null, { login, push })(LoginForm)
