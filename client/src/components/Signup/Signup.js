import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from '../Login/Login.css'
import { signup } from '../../actions'

/** Method to validate email - adapted from http://rosskendall.com/blog/web/javascript-function-to-check-an-email-address-conforms-to-rfc822
 * @param value - email to be validated
 * @returns {*}
 */
const validateEmail = value => {
  console.log('error')
  if (!value || (value && value.length === 0)) {
    return "Can't be blank"
  }

  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]'
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]'
  const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+'
  const sQuotedPair = '\\x5c[\\x00-\\x7f]'
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d'
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22'
  const sDomainRef = sAtom
  const sSubDomain = '(' + sDomainRef + '|' + sDomainLiteral + ')'
  const sWord = '(' + sAtom + '|' + sQuotedString + ')'
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*'
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*'
  const sAddrSpec = sLocalPart + '\\x40' + sDomain // complete RFC822 email address spec
  const sValidEmail = '^' + sAddrSpec + '$' // as whole string

  const reValidEmail = new RegExp(sValidEmail)

  return (reValidEmail.test(value)) ? undefined : 'Invalid email'
}
const renderEmail = ({input, meta: {error, warning}}) => {
  return (
    <div>
      <input className={styles.inputEmail}
             placeholder="Email"
             {...input} />
      {((error && <div>{error}</div>) || (warning && <div>{warning}</div>))}
    </div>

  )
}

const renderPassword = (field) => {
  return (
    <input className={styles.inputPassword}
           type="password"
           placeholder="Password"
           {...field.input} />
  )
}

const Signup = (props) => {
  const {handleSubmit} = props
  return (
    <form className={styles.form} onSubmit={handleSubmit(signup)}>
      <h1 className={styles.title}>Signup</h1>

      <Field name="email"
             component={renderEmail} validate={validateEmail}/>
      <Field name="password"
             component={renderPassword}/>

      <button className={styles.buttonSubmit} type="submit">
        Submit
      </button>
    </form>
  )
}

Signup.propTypes = {
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(Signup)
