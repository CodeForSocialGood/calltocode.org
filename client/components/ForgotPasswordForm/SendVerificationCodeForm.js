import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

function EmailField ({ input }) {
  return (
    <input className={styles.inputEmail}
      placeholder="Email"
      {...input} />
  )
}

const SendVerificationCodeForm = props => {
  const {handleSubmit} = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.h1}>Forgot Password?</h1>
      <h3 className={styles.h3}>{"Let's get you a new one!"}</h3>

      <Field value={props.email}
        name="email"
        onChange={props.onChangeEmail}
        component={EmailField} />

      <button disabled={props.email.length === 0}
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
SendVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'ForgotPasswordForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SendVerificationCodeForm)
