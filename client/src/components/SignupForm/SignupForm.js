import React from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import SignupValidator from './SignupValidator'

import styles from './SignupForm.scss'
import { signup } from '../../actions'

const EmailField = ({ input, meta: { error } }) => {
  const emailClasses = `${styles.inputEmailContainer} ${error ? styles.error : styles.valid}`

  return [
    <div key="mailContainer" className={emailClasses}>
      <input key="field"
        className={styles.inputEmailWithError}
        placeholder="Email"
        {...input } />
      <div key="valid" className={error ? styles.cross : styles.tick}></div>
    </div>,
    <div key="error" className={styles.inputEmailError}>
      {error}
    </div>
  ]
}

const PasswordField = ({ input, meta: { active, error } }) => {
  const passClasses = `${styles.inputPassword} ${error ? styles.error : styles.valid}`

  return [
    <input key="field"
      className={passClasses}
      type="password"
      placeholder="Password"
      {...input} />,
    <Field key="popup" name="popup"
      component={ValidationPopup} active={active} error={error} />
  ]
}

const IsOrganizationField = ({ input }) => {
  return (
    <div className={styles.inputCheckboxContainer}>
      <input className={styles.inputIsOrganization}
        type="checkbox"
        { ...input } />
      <label>Organization</label>
    </div>
  )
}

const OrganizationNameField = ({ input }) => {
  return (
    <input className={styles.inputOrganizationName}
      type="text"
      placeholder="Organization Name"
      { ...input } />
  )
}

const OrganizationURLField = ({ input }) => {
  return (
    <input className={styles.inputOrganizationURL}
      type="text"
      placeholder="Organization URL"
      { ...input } />
  )
}

const ValidationPopup = ({ error, active }) => {
  return (
    <div className={`${styles.validpopup} ${active ? styles.show : styles.hide}` }>
      <p className={styles.bold}>Password must have</p>
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

const SignupForm = (props) => {
  const { handleSubmit, isOrganization, signup } = props

  return (
    <form className={styles.form} onSubmit={handleSubmit(signup)}>
      <h1 className={styles.title}>Signup</h1>

      <Field name="email"
        component={ EmailField }
        validate={SignupValidator.validateEmail} />
      <Field name="password"
        component={ PasswordField }
        validate={SignupValidator.validatePassword} />

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

      <button className={isOrganization ? styles.buttonSubmitMoved : styles.buttonSubmit}
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
