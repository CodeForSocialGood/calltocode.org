import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import styles from './LoginForm.scss'
import {buttonSubmit} from './loginFormJss'
import {withStyles} from 'material-ui/styles'

/**
 * material ui components
 */
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class LoginForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      email: '',
      password: '',
      error: {},
      isValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault()
    if (this.state.email.length === 0) {
      this.setState({
        error: {
          ...this.state.error,
          'email': this.state.email.length === 0,
          'password': this.state.password.length === 0
        }
      })
    }

    const loginRes = await this.props.doLogin(this.state.email, this.state.password)
    if (loginRes) {
      this.context.router.history.push('/')
    }
  }

  canBeSubmitted () {
    const { email, password } = this.state
    return (
      email.length > 0 &&
      password.length > 0
    )
  }

  onBlur (event) {
    event.preventDefault()
    this.setState({
      error: { ...this.state.error, [event.target.name]: this.state[event.target.name].length === 0 }
    })
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  render () {
    const {classes} = this.props
    const isEnabled = this.canBeSubmitted()

    return (
      <form id="loginForm" className={styles.form} onSubmit={this.onSubmit}>
        <h1 className={styles.h1}>Login</h1>

        <TextField required id="email" error={this.state.error['email']} label="Email" type="text" fullWidth
          className={styles.inputEmail} name="email"
          onChange={this.handleChange} onBlur={this.onBlur}/>

        <TextField required id="password" error={this.state.error['password']} label="Password" type="password"
          fullWidth className={styles.inputPassword} name="password"
          onChange={this.handleChange} onBlur={this.onBlur}/>

        <Button type="submit" raised className={classes.root} color="primary" fullWidth={true} disabled={!isEnabled}>
          Submit
        </Button>

        <div className={styles.errorContent}>
          {this.props.error}
        </div>

        <Link
          className={styles.forgotPassword}
          key='forgotPassword'
          to='/forgot-password'>
          Forgot Password?
        </Link>
      </form>
    )
  }
}

const mapDispatchToProps = {
  doLogin: AuthActionCreator.doLogin
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object
}

LoginForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  doLogin: PropTypes.func,
  classes: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(buttonSubmit)(LoginForm))
