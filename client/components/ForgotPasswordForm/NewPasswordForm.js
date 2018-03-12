import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './ForgotPasswordForm.scss'
import PasswordInput from '../shared/PasswordInput/PasswordInput'

import Button from 'material-ui/Button'
import { actionButton } from './forgotPasswordJss'
import { withStyles } from 'material-ui/styles'

class NewPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = { passHasErrors: false }
    this.hasErrors = this.hasErrors.bind(this)
  }
  hasErrors (value) {
    this.setState({ passHasErrors: value })
  }
  render () {
    const { classes } = this.props

    return (
      <form className={styles.form}>
        <h1 className={styles.h1}>New Password</h1>
        <h3 className={styles.h3}>Set your new password</h3>
        <div className={styles.inputPasswordContainer}>
          <PasswordInput hasErrors={this.hasErrors} onChangePassword={this.props.onChangePassword} fullWidth={true}
            inputClassName={styles.inputPassword} nameTextField="password" />
        </div>

        <Button disabled={this.props.password.length === 0 || this.state.passHasErrors}
          raised className={classes.root}
          color="primary" onClick={this.props.changePass}
          fullWidth={true} >
          Change Password
        </Button>
      </form>
    )
  }
}

NewPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  onChangePassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  changePass: PropTypes.func,
  classes: PropTypes.object
}

export default withStyles(actionButton)(NewPasswordForm)
