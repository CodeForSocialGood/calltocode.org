import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import SignupValidator from '../SignupForm/SignupValidator'
import ValidationPopup from '../SignupForm/ValidationPopup'
import styles from './NewPasswordForm.scss'
import AuthActionCreator from '../../actions/auth'

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

  customSubmit (values) {
    const { password } = values

    // hardcoded the email, will be changed after the implementation of Forgot Password verification page
    // const { email } = this.props
    let { email } = this.props
    if (!email) email = 'kevin@email.com'

    this.props.changePassword({ email, password })
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(this.customSubmit.bind(this))}>
        <h1 className={styles.title}>New Password</h1>

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

const mapDispatchToProps = {
  changePassword: AuthActionCreator.changePassword
}

function mapStateToProps (state) {
  return {
    email: state.email
  }
}

NewPasswordForm.propTypes = {
  changePassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  email: PropTypes.object
}

const NewPasswordFormRedux = reduxForm({
  form: 'NewPasswordForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(NewPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordFormRedux)
