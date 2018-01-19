import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

function CodeField ({ input }) {
  return (
    <input
      className={styles.inputEmail}
      placeholder="Code"
      {...input} />
  )
}

const ValidateVerificationCodeForm = props => {
  const {handleSubmit} = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Forgot Password?</h1>
      <h3 className={styles.h3}>{"Let's validate your code!"}</h3>

      <Field
        value={props.code}
        onChange={props.onChangeCode}
        name="code"
        component={CodeField} />

      <button disabled={props.code.length === 0}
        className={styles.buttonSubmit}
        type="submit">
      Validate code
      </button>
    </form>
  )
}

CodeField.propTypes = {
  input: PropTypes.object
}
ValidateVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  onChangeCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'ForgotPasswordForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ValidateVerificationCodeForm)
