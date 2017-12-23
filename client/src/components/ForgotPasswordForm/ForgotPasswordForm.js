import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AuthActionCreator from '../../actions/auth'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import ValidateVerificationCode from './ValidateVerificationCodeForm'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      page: 1
    }
  }

  nextPage ({email}) {
    this.setState({page: this.state.page + 1})
    console.log('AAAAA', email)
    this.props.sendValidationCode(email)
  }

  validate ({code}) {
    this.props.validateCode(this.props.email, code)
  }

  render () {
    const {page} = this.state
    const {handleSubmit} = this.props
    return (
      <div>
        {page === 1 && <SendVerificationCodeForm onSubmit={this.nextPage} />}
        {page === 2 &&
          <ValidateVerificationCode onSubmit={handleSubmit(this.validate)}
          />}
      </div>
    )
  }
}

ForgotPasswordForm.propTypes = {
  sendValidationCode: PropTypes.func,
  validateCode: PropTypes.func,
  email: PropTypes.string,
  handleSubmit: PropTypes.func
}

const mapDispatchToProps = {
  sendValidationCode: AuthActionCreator.sendValidationCode,
  validateCode: AuthActionCreator.validateCode
}

function mapStateToProps (state) {
  return {
    email: state.forgotPass.email
  }
}

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => {
    result
      ? dispatch(push('/new-password'))
      : dispatch(push('/forgot-password'))
  }
})(ForgotPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormRedux)

/* function EmailField ({ input }) {
  return (
    <input
      className={styles.inputEmail}
      placeholder="Email"
      {...input} />
  )
}

function ForgotPasswordForm (props) {
  const { handleSubmit, sendValidationCode, email } = props
  return (
    <div>
      {!email &&
        <form onSubmit={handleSubmit(sendValidationCode)}
          className={styles.form}>

          <h1
            className={styles.title}>
            Forgot Password?
          </h1>

          <h3>{"Let's get you a new one!"}</h3>

          <Field
            name="email"
            component={EmailField} />

          <button
            className={styles.buttonSubmit}
            type="submit">
            Send Verification Code
          </button>
        </form>
      }
      {email &&
        <form onSubmit={handleSubmit(sendValidationCode)}
          className={styles.form}>

          <h1
            className={styles.title}>
            Forgot Password?
          </h1>

          <h3>{"Let's get you a new one!"}</h3>

          <Field
            name="email"
            component={EmailField} />

          <button
            className={styles.buttonSubmit}
            type="submit">
            Validate code
          </button>
        </form>
      }
    </div>
  )
}

EmailField.propTypes = {
  input: PropTypes.object
}
ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendValidationCode: PropTypes.func,
  email: PropTypes.string
}

const mapDispatchToProps = {
  sendValidationCode: AuthActionCreator.sendValidationCode
}

function mapStateToProps (state) {
  return {
    email: state.forgotPass.email
  }
}

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/forgot-password'))
})(ForgotPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormRedux) */
