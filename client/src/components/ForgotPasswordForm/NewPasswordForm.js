import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import SignupValidator from '../SignupForm/SignupValidator'
import ValidationPopup from '../SignupForm/ValidationPopup'
import styles from './ForgotPasswordForm.scss'

class NewPasswordForm extends Component {
  renderPassword (field) {
    const passClasses = `${styles.inputPassword} 
                         ${field.meta.pristine ? '' : (field.meta.error ? styles.error : styles.valid)}`
    return (
      <div className={ styles.inputPasswordContainer }>
        <input
          className={ passClasses }
          placeholder="New Password"
          type="password"
          {...field.input} />
        <Field
          name="popup"
          component={ValidationPopup}
          active={field.meta.active}
          error={field.meta.error} />
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>New Password</h1>
        <h3>Set your new password</h3>
        <Field
          name="password"
          component={this.renderPassword}
          validate={SignupValidator.validatePassword} />
        <button className={styles.buttonSubmit} type="submit">
          Change Password
        </button>
      </form>
    )
  }
}

NewPasswordForm.propTypes = {
  changePassword: PropTypes.func,
  handleSubmit: PropTypes.func
}

const NewPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(NewPasswordForm)

export default connect(null)(NewPasswordFormRedux)
