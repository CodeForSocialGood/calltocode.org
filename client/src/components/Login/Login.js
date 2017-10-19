import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from './Login.css'
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
    const { handleSubmit, login, error, submitting } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(login)}>
        <h1 className={styles.title}>Login</h1>

        <Field name="email"
          component={this.renderEmail} />
        <Field name="password"
          component={this.renderPassword} />

        <button className={styles.buttonSubmit} type="submit" disabled={submitting}>
          Login
        </button>
        <div className={styles.errorContent}>{error}</div>
      </form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func
}

const LoginForm = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(Login)

export default connect(null, { login })(LoginForm)
