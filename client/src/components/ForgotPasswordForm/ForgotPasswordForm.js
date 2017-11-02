import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'

import styles from './ForgotPasswordForm.scss'

class ForgotPasswordForm extends Component {
  renderEmail (field) {
    return (
      <input
        className={styles.inputEmail}
        placeholder="Email"
        {...field.input} />
    )
  }

  render () {
    return (
      <form
        className={styles.form}>

        <h1
          className={styles.title}>
          Forgot Password?
        </h1>

        <h3>{"Let's get you a new one!"}</h3>

        <Field
          name="email"
          component={this.renderEmail}/>

        <button
          className={styles.buttonSubmit}
          type="submit">
          Send Verification Code
        </button>
      </form>
    )
  }
}

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/login'))
})(ForgotPasswordForm)

export default ForgotPasswordFormRedux
