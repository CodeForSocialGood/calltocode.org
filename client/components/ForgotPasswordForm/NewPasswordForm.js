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
        <h1 className={styles.h1}>New Password</h1>
        <h3 className={styles.h3}>Set your new password</h3>
        <Field
          name="password"
          value={this.props.password}
          onChange={this.props.onChangePassword}
          component={this.renderPassword}
          validate={SignupValidator.validatePassword} />
        <button className={styles.buttonSubmit} disabled={this.props.password.length === 0} type="submit">
          Change Password
        </button>
      </form>
    )
  }
}

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  onChangePassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
}

const NewPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(NewPasswordForm)

export default connect(null)(NewPasswordFormRedux)
