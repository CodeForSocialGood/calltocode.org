import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import usersApiClient from '../../api/users'
import styles from './LoginForm.scss'

class LoginForm extends Component {
  renderEmail (field) {
    return (
      <input className={styles.inputEmail}
        placeholder="Email"
        title = {field.meta.error}
        {...field.input} />
    )
  }

  renderPassword (field) {
    return (
      <input className={styles.inputPassword}
        placeholder="Password"
        type="password"
        title = {field.meta.error}
        {...field.input} />
    )
  }

  async validateEmailAndPassword (values) {
    const { email, password } = values
    const response = await usersApiClient.login(email, password)
    if (response.status === 200) {
      const user = await response.json()
      this.props.login(user)
      return user.usertype
    } else {
      handleValidationRequestError(response, email, password)
    }
  }

  render () {
    const { error, handleSubmit } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(this.validateEmailAndPassword.bind(this))}>
        <h1 className={styles.title}>Login</h1>

        <Field
          name="email"
          component={this.renderEmail} />
        <Field
          name="password"
          component={this.renderPassword} />

        <button className={styles.buttonSubmit} type="submit">
          Submit
        </button>
        <div className={styles.errorContent}>
          {error}
        </div>

        <Link
          className={styles.forgotPassword}
          key='forgotPassword'
          to='/forgot-password' >
          Forgot Password?
        </Link>
      </form>
    )
  }
}

function handleValidationRequestError (response, email, password) {
  const _error = 'Incorrect credentials, please try again!'

  if (response.status === 403) {
    if (response.statusText === 'Wrong email') {
      throw new SubmissionError({ email: response.statusText, _error })
    } else if (response.statusText === 'Wrong password') {
      throw new SubmissionError({ password: response.statusText, _error })
    } else {
      throw new SubmissionError({ email, _error: response.statusText })
    }
  } else {
    throw new SubmissionError({ email, _error: response.statusText })
  }
}

const mapDispatchToProps = {
  login: AuthActionCreator.login
}

LoginForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  login: PropTypes.func
}

const LoginFormRedux = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => {
    result === 'contact'
      ? dispatch(push('/profile'))
      : dispatch(push('/'))
  }
})(LoginForm)

export default connect(null, mapDispatchToProps)(LoginFormRedux)
