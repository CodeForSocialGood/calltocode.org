import React, { Component } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AuthActionCreator from '../../actions/auth'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import ValidateVerificationCode from './ValidateVerificationCodeForm'
import NewPasswordForm from './NewPasswordForm'
import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import forgotPasswordApiClient from '../../api/forgotPassword'
import styles from './ForgotPasswordForm.scss'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.validate = this.validate.bind(this)
    this.changePass = this.changePass.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      page: 1,
      email: '',
      code: '',
      password: ''
    }
  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async nextPage ({email}) {
    const apiOptions = apiOptionsFromState()
    const response = await forgotPasswordApiClient.sendValidationCode(apiOptions, email)
    if (response.status === 200) {
      this.setState({page: this.state.page + 1})
    } else {
      throw new SubmissionError({code: 'send email failed!', _error: 'send email failed!'})
    }
  }

  async validate (values, dispatch) {
    const _error = 'Incorrect code, please try again!'
    const apiOptions = apiOptionsFromState()
    const response = await forgotPasswordApiClient.validateCode(apiOptions, this.state.email, values.code)
    if (response.status === 200) {
      this.setState({page: this.state.page + 1})
    } else {
      throw new SubmissionError({ code: response.statusText, _error })
    }
  }

  changePass (values, dispatch) {
    return this.props.changePassword(this.state.email, values.password).then(() => {
      dispatch(push('/'))
    }).catch(error => {
      throw new SubmissionError({code: error.name, _error: error.message})
    })
  }

  render () {
    const {page} = this.state
    const {error} = this.props
    return (
      <div>
        {page === 1 && <SendVerificationCodeForm email={this.state.email} onChangeEmail={this.onChange} onSubmit={this.nextPage} />}
        {page === 2 &&
        <div>
          <ValidateVerificationCode code={this.state.code} onChangeCode={this.onChange} onSubmit={this.validate}/>
        </div>}
        {page === 3 &&
        <div>
          <NewPasswordForm password={this.state.password} onChangePassword={this.onChange} onSubmit={this.changePass}/>
        </div>}
        <div className={styles.errorContent}>
          {error}
        </div>
      </div>

    )
  }
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

const ForgotPasswordFormRedux = reduxForm({
  form: 'ForgotPasswordForm',
  onSubmitSuccess: (result, dispatch) => {
    dispatch(push('/'))
  }
})(ForgotPasswordForm)

export default connect(null, mapDispatchToProps)(ForgotPasswordFormRedux)
