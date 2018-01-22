import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import Validators from '../shared/Utils/Validators'
import styles from './SignupForm.scss'
import TextField from 'material-ui/TextField'
import PasswordInput from '../shared/PasswordInput/PasswordInput'

function IsOrganizationField ({ input }) {
  return (
    <div className={styles.inputCheckboxContainer}>
      <input className={styles.inputIsOrganization}
        type="checkbox"
        { ...input } />
      <label>Organization</label>
    </div>
  )
}

function OrganizationNameField ({ input }) {
  return (
    <input className={styles.inputOrganizationName}
      type="text"
      placeholder="Organization Name"
      { ...input } />
  )
}

function OrganizationURLField ({ input }) {
  return (
    <input className={styles.inputOrganizationURL}
      type="text"
      placeholder="Organization URL"
      { ...input } />
  )
}

class SignupForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      error: {
        email: '',
        password: false
      },
      password: '',
      email: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeGeneric = this.onChangeGeneric.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.hasErrors = this.hasErrors.bind(this)
  }
  hasErrors (value) {
    this._setErrors(null, value)
  }

  _setState (prop, value) {
    this.setState({ [prop]: value })
  }

  _setErrors (email, password) {
    this.setState({
      error: {
        email: email || this.state.email,
        password: password || this.state.password
      }
    })
  }

  onChangePassword (event) {
    event.preventDefault()
    this._setState('password', event.target.value)
  }

  onChangeEmail (event) {
    const email = event.target.value
    event.preventDefault()
    this._setState('email', email)
    const emailValidation = Validators.validateEmail(email)
    this._setErrors(emailValidation, null)
  }

  onChangeGeneric (event) {
    event.preventDefault()
    this._setState(event.target.name, event.target.value)
  }

  render () {
    const { handleSubmit, isOrganization, signup } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(signup)}>
        <h1 className={styles.h1}>Signup</h1>

        <TextField required id="email"
          label="Email" type="text" error={this.state.error.email.length !== 0}
          helperText={this.state.error.email}
          onChange={this.onChangeEmail}
          fullWidth className={styles.inputEmailContainer}
          name="email" />
        <div className={styles.inputPasswordContainer}>
          <PasswordInput hasErrors={this.hasErrors} onChangePassword={this.onChangePassword}
            fullWidth inputClassName={styles.inputPassword}
            nameTextField="password" />
        </div>

        <Field name="isOrganization"
          component={IsOrganizationField} />

        {isOrganization &&
          <Field name="organizationName"
            component={OrganizationNameField} />
        }

        {isOrganization &&
          <Field name="organizationURL"
            component={OrganizationURLField} />
        }

        <button className={isOrganization ? styles.buttonSubmitMoved : styles.buttonSubmit}
          type="submit">
          Submit
        </button>
      </form>
    )
  }
}

function mapStateToProps (state) {
  const selector = formValueSelector('SignupForm')

  return {
    isOrganization: selector(state, 'isOrganization')
  }
}

const mapDispatchToProps = {
  signup: AuthActionCreator.signup
}

IsOrganizationField.propTypes = {
  input: PropTypes.object
}

OrganizationNameField.propTypes = {
  input: PropTypes.object
}

OrganizationURLField.propTypes = {
  input: PropTypes.object
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  isOrganization: PropTypes.bool,
  signup: PropTypes.func
}

const SignupFormRedux = reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(SignupForm)

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormRedux)
