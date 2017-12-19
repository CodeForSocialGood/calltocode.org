import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

function EmailField ({ input }) {
  return (
    <input
      className={styles.inputEmail}
      placeholder="Email"
      {...input} />
  )
}

const SendVerificationCodeForm = props => {
  const {handleSubmit} = props
  return (

    <form onSubmit={handleSubmit}
      className={styles.form}>

      <h1
        className={styles.title}>
            Forgot Password?
      </h1>

      <h3>{"Let's get you a new one!"}</h3>

      <Field
        name="email"
        component={EmailField} />

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
SendVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'ForgotPasswordForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount  
})(SendVerificationCodeForm)
