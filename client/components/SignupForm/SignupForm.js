import React from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import SignupValidator from './SignupValidator'
import ValidationPopup from './ValidationPopup'
import styles from './SignupForm.scss'

function EmailField ({ input, meta: { dirty, error } }) {
  const emailClasses = `${styles.inputEmail} ${getValidationClass(dirty, error)}`

  return (
    <div className={ styles.inputEmailContainer }>
      <input className={ emailClasses }
        type="text"
        placeholder="Email"
        { ...input } />
      { dirty &&
        <div className={ error ? styles.cross : styles.tick }></div>
      }
      { dirty &&
        <div className={ styles.inputEmailError }>{ error }</div>
      }
    </div>
  )
}

function PasswordField ({ input, meta: { active, dirty, error } }) {
  const passwordClasses = `${styles.inputPassword} ${getValidationClass(dirty, error)}`

  return (
    <div className={ styles.inputPasswordContainer }>
      <input className={ passwordClasses }
        type="password"
        placeholder="Password"
        { ...input } />
      <Field key="popup" name="popup"
        component={ ValidationPopup } active={ active } error={ error } />
    </div>
  )
}

function IsOrganizationField ({ input }) {
  return (
    <div className={ styles.inputCheckboxContainer }>
      <input className={ styles.inputIsOrganization }
        type="checkbox"
        { ...input } />
      <label>Organization</label>
    </div>
  )
}

function OrganizationNameField ({ input }) {
  return (
    <input className={ styles.inputOrganizationName }
      type="text"
      placeholder="Organization Name"
      { ...input } />
  )
}

function OrganizationURLField ({ input }) {
  return (
    <input className={ styles.inputOrganizationURL }
      type="text"
      placeholder="Organization URL"
      { ...input } />
  )
}

function getValidationClass (dirty, error) {
  if (dirty) {
    return error ? styles.error : styles.valid
  }

  return ''
}

function SignupForm (props) {
  const { handleSubmit, isOrganization, signup } = props

  return (
    <form className={ styles.form } onSubmit={ handleSubmit(signup) }>
      <h1 className={styles.h1}>Signup</h1>

      <Field name="email"
        component={ EmailField }
        validate={ SignupValidator.validateEmail } />

      <Field name="password"
        component={ PasswordField }
        validate={ SignupValidator.validatePassword } />

      <Field name="isOrganization"
        component={ IsOrganizationField } />

      { isOrganization &&
        <Field name="organizationName"
          component={ OrganizationNameField } />
      }

      { isOrganization &&
        <Field name="organizationURL"
          component={ OrganizationURLField } />
      }

      <button className={ isOrganization ? styles.buttonSubmitMoved : styles.buttonSubmit }
        type="submit">
        Submit
      </button>
    </form>
  )
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

EmailField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

PasswordField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
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
