import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from './Login.css'
import { login } from '../../actions'
import loginApiClient from '../../api/login'

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

  async validateEmailAndPassword (values) {
    const { email, password } = values
    const response = await loginApiClient.login(email, password)

    if (response.status === 403) {
      throw new SubmissionError({ email, _error: 'Unauthorized!' })
    } else {
      this.props.login({ email })
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(this.validateEmailAndPassword.bind(this))}>
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

const LoginForm = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(Login)

export default connect(null, { login })(LoginForm)
