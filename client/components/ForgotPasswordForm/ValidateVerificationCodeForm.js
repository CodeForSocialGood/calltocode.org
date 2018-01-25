import React from 'react'
import styles from './ForgotPasswordForm.scss'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { actionButton } from './forgotPasswordJss'
import { withStyles } from 'material-ui/styles'

const ValidateVerificationCodeForm = props => {
  const { classes } = props
  return (
    <form className={styles.form}>
      <h1 className={styles.h1}>Forgot Password?</h1>
      <h3 className={styles.h3}>{"Let's validate your code!"}</h3>

      <TextField required id="code"
        label="Code" type="text" fullWidth className={styles.inputEmail} name="code"
        onChange={props.onChangeCode} />

      <Button disabled={props.code.length === 0}
        raised className={classes.root}
        color="primary" onClick={props.validateCode}
        fullWidth={true} >
        Validate code
      </Button>

    </form>
  )
}
ValidateVerificationCodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  onChangeCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  validateCode: PropTypes.func.isRequired,
  classes: PropTypes.object
}

export default withStyles(actionButton)(ValidateVerificationCodeForm)
