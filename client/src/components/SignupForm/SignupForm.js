import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import SignupValidator from './SignupValidator'

import styles from '../LoginForm/LoginForm.scss'
import { signup } from '../../actions'

function EmailField ({ input, meta: { error } }) {
  return [
    <input key="field"
      className={styles.inputEmail}
      placeholder="Email"
      {...input} />,

    <div key="error">
      {error}
    </div>
  ]
}

function PasswordField ({ input, meta: { error } }) {
  return [
    <input key="field"
      className={styles.inputPassword}
      type="password"
      placeholder="Password"
      {...input} />,

    <div key="error">
      {JSON.stringify(error)}
    </div>
  ]
}

function SignupForm (props) {
  const { handleSubmit, signup } = props

  return (
    <form className={styles.form} onSubmit={handleSubmit(signup)}>
      <h1 className={styles.title}>Signup</h1>

      <Field name="email"
        component={EmailField}
        validate={SignupValidator.validateEmail} />
      <Field name="password"
        component={PasswordField}
        validate={SignupValidator.validatePassword} />

      <button className={styles.buttonSubmit} type="submit">
        Submit
      </button>
    </form>
  )
}

EmailField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

PasswordField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
}

const SignupFormRedux = reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(SignupForm)

export default connect(null, { signup })(SignupFormRedux)
