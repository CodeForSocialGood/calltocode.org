import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from '../Login/Login.scss'
import { signup } from '../../actions'

class Signup extends Component {
  renderEmail (field) {
    return (
      <input className={styles.inputEmail}
        placeholder="Email"
        {...field.input} />
    )
  }

  renderPassword (field) {
    return (
      <input className={styles.inputPassword}
        type="password"
        placeholder="Password"
        {...field.input} />
    )
  }

  render () {
    const { handleSubmit, signup } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(signup)}>
        <h1 className={styles.title}>Signup</h1>

        <Field name="email"
          component={this.renderEmail} />
        <Field name="password"
          component={this.renderPassword} />

        <button className={styles.buttonSubmit} type="submit">
          Submit
        </button>
      </form>
    )
  }
}

Signup.propTypes = {
  signup: PropTypes.func,
  handleSubmit: PropTypes.func
}

const SignupForm = reduxForm({
  form: 'SignupForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/'))
})(Signup)

export default connect(null, { signup })(SignupForm)
