import React from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import SignupValidator from './SignupValidator'

import styles from './SignupForm.scss'
import { signup } from '../../actions'

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

function ValidationPopup ({ active, error }) {
  return (
    <div className={ `${styles.validationPopup} ${active ? styles.show : styles.hide}` }>
      <p className={ styles.bold }>Password must have</p>
      <ul>
        <li className={ error == null || error.upperCase ? styles.tick : styles.cross }> at least 1 UpperCase Character </li>
        <li className={ error == null || error.lowerCase ? styles.tick : styles.cross }> at least 1 LowerCase Character </li>
        <li className={ error == null || error.hasOneDigit ? styles.tick : styles.cross }> at least 1 Number </li>
        <li className={ error == null || error.hasSpecialChar ? styles.tick : styles.cross }> at least 1 Special Character </li>
        <li className={ error == null || error.minLength ? styles.tick : styles.cross }> at least 10 Characters </li>
        <li className={ error == null || error.maxLength ? styles.tick : styles.cross }> at most 128 Characters </li>
        <li className={ error == null || error.noIdenticalChars ? styles.tick : styles.cross }> not more than 2 identical characters in a row </li>
      </ul>
    </div>
  )
}

function SignupForm (props) {
  const { handleSubmit, isOrganization, signup } = props

  return (
    <form className={ styles.form } onSubmit={ handleSubmit(signup) }>
      <h1 className={ styles.title }>Signup</h1>

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

ValidationPopup.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.object
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

const selector = formValueSelector('SignupForm')
const mapStateToProps = state => {
  return { isOrganization: selector(state, 'isOrganization') }
}

export default connect(mapStateToProps, { signup })(SignupFormRedux)
