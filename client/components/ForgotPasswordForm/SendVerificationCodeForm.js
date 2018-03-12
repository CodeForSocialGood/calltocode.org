import React from 'react'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { actionButton } from './forgotPasswordJss'
import { withStyles } from 'material-ui/styles'

const SendVerificationCodeForm = props => {
  const { classes } = props
  return (
    <form className={styles.form}>
      <h1 className={styles.h1}>Forgot Password?</h1>
      <h3 className={styles.h3}>{"Let's get you a new one!"}</h3>

      <TextField required id="email"
        label="Email" type="text" fullWidth className={styles.inputEmail} name="email"
        onChange={props.onChangeEmail} />

      <Button disabled={props.email.length === 0}
        raised className={classes.root}
        color="primary" onClick={props.nextPage}
        fullWidth={true} >
        Send Verification Code
      </Button>
    </form>
  )
}
SendVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  classes: PropTypes.object,
  nextPage: PropTypes.func
}

export default (withStyles(actionButton)(SendVerificationCodeForm))
