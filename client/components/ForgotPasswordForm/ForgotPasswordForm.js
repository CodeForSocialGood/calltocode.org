import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthActionCreator from '../../actions/auth'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import ValidateVerificationCode from './ValidateVerificationCodeForm'
import NewPasswordForm from './NewPasswordForm'
import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
import styles from './ForgotPasswordForm.scss'

class ForgotPasswordForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.nextPage = this.nextPage.bind(this)
    this.validate = this.validate.bind(this)
    this.changePass = this.changePass.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      page: 1,
      email: '',
      code: '',
      password: '',
      error: ''
    }
  }

  onChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  async nextPage () {
    const apiOptions = apiOptionsFromState()
    const response = await usersApiClient.createCode(apiOptions, this.state.email)
    if (response.status === 200) {
      this.setState({
        page: this.state.page + 1,
        error: ''
      })
    } else {
      this.setState({ error: 'send email failed!' })
    }
  }

  async validate () {
    const { email, code } = this.state
    const apiOptions = apiOptionsFromState()
    const response = await usersApiClient.validateCode(apiOptions, email, code)
    if (response.status === 200) {
      this.setState({
        page: this.state.page + 1,
        error: ''
      })
    } else {
      this.setState({ error: 'Incorrect code, please try again!' })
    }
  }

  changePass () {
    return this.props.changePassword(this.state.email, this.state.password).then(() => {
      this.context.router.history.push('/')
    }).catch(error => {
      this.setState({ error: error.message })
    })
  }

  render () {
    const { page, error } = this.state
    return (
      <Fragment>
        {page === 1 && <SendVerificationCodeForm email={this.state.email} onChangeEmail={this.onChange} nextPage={this.nextPage} />}
        {page === 2 &&
          <div>
            <ValidateVerificationCode code={this.state.code} onChangeCode={this.onChange} validateCode={this.validate} />
          </div>}
        {page === 3 &&
          <div>
            <NewPasswordForm password={this.state.password} onChangePassword={this.onChange} changePass={this.changePass} />
          </div>}
        <div className={styles.errorContent}>
          {error}
        </div>
      </Fragment>

    )
  }
}

ForgotPasswordForm.contextTypes = {
  router: PropTypes.object
}

ForgotPasswordForm.propTypes = {
  sendValidationCode: PropTypes.func,
  validateCode: PropTypes.func,
  email: PropTypes.string,
  handleSubmit: PropTypes.func,
  error: PropTypes.any,
  changePassword: PropTypes.func
}

const mapDispatchToProps = {
  changePassword: AuthActionCreator.changePassword
}

export default connect(null, mapDispatchToProps)(ForgotPasswordForm)
