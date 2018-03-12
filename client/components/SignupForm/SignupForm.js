import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import Validators from '../shared/Utils/Validators'
import styles from './SignupForm.scss'
import TextField from 'material-ui/TextField'
import PasswordInput from '../shared/PasswordInput/PasswordInput'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import { withStyles } from 'material-ui/styles'
import { buttonSubmit } from './SignupFormJss'
import Button from 'material-ui/Button'

class SignupForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      error: {
        email: '',
        password: false
      },
      password: '',
      email: '',
      isOrganization: false
    }
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeGeneric = this.onChangeGeneric.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.hasErrors = this.hasErrors.bind(this)
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
        email: email === undefined ? '' : email || this.state.error.email,
        password: password || this.state.error.password
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

  onChangeCheckbox (event) {
    this._setState('isOrganization', event.target.checked)
  }
  onSubmit (event) {
    const { email, password, isOrganization } = this.state
    this.props.signup({ email, password, isOrganization }).then(
      this.context.router.history.push('/')
    )
  }

  render () {
    const { classes } = this.props
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
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

        <FormControlLabel className={styles.inputCheckboxContainer}
          control={
            <Checkbox name='isOrganization'
              checked={this.state.isOrganization}
              onChange={this.onChangeCheckbox}
              value="isOrganization"
            />
          }
          label="Organization"
        />
        {this.state.isOrganization &&
          <Fragment>
            <TextField required id="organizationName"
              label="Organization name" type="text"
              onChange={this.onChangeGeneric}
              fullWidth className={styles.inputOrganizationName}
              name="organizationName" />

            <TextField required id="organizationURL"
              label="Organization URL" type="text"
              onChange={this.onChangeGeneric}
              fullWidth className={styles.inputOrganizationURL}
              name="organizationURL" />

          </Fragment>
        }
        <Button
          raised className={classes.root}
          style={{ gridRow: this.state.isOrganization ? 9 : 6 }}
          color="primary"
          type="submit"
          fullWidth={true} >
          Submit
        </Button>
      </form >
    )
  }
}

SignupForm.contextTypes = {
  router: PropTypes.object
}

const mapDispatchToProps = {
  signup: AuthActionCreator.signup
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  isOrganization: PropTypes.bool,
  signup: PropTypes.func,
  classes: PropTypes.object
}

export default connect(null, mapDispatchToProps)(withStyles(buttonSubmit)(SignupForm))
