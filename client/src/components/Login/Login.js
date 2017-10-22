import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from './Login.scss'
import credentials from '../../data/login'
import { login } from '../../actions'

class Login extends Component {
  renderEmail (field) {
    return (
      <input className={styles.inputEmail}
        placeholder="Email"
        {...field.input} />
    )
  }

  renderPassword (field) {
    return (
      <input className={styles.inputPassword}
        placeholder="Password"
        type="password"
        {...field.input} />
    )
  }

  render () {
    const { handleSubmit, login } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(login)}>
        <h1 className={styles.title}>Login</h1>

        <Field name="email"
          component={this.renderEmail} />
        <Field name="password"
          component={this.renderPassword} />

        <button className={styles.buttonSubmit} type="submit">
          Submit
        </button>
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

export default connect(null, { login })(LoginForm)
