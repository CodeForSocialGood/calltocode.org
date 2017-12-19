import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AuthActionCreator from '../../actions/auth'

import styles from './ForgotPasswordForm.scss'

function EmailField ({input}) {
  return (
    <input
      className={styles.inputEmail}
      placeholder="Email"
      {...input} />
  )
}

function ForgotPasswordForm (props) {
  const { handleSubmit, sendValidationCode } = props
  return (
    <form onSubmit={ handleSubmit(sendValidationCode) }
      className={styles.form}>

      <h1
        className={styles.title}>
          Forgot Password?
      </h1>

      <h3>{"Let's get you a new one!"}</h3>

      <Field
        name="email"
        component={EmailField}/>

      <button
        className={styles.buttonSubmit}
        type="submit">
          Send Verification Code
      </button>
    </form>
  )
}

EmailField.propTypes = {
  input: PropTypes.object
}
ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendValidationCode: PropTypes.func
}

const mapDispatchToProps = {
  sendValidationCode: AuthActionCreator.sendValidationCode
}

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/login'))
})(ForgotPasswordForm)

export default connect(null, mapDispatchToProps)(ForgotPasswordFormRedux)
