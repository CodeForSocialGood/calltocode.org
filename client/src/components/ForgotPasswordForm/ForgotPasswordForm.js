import React, { Component } from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import AuthActionCreator from '../../actions/auth'
import SendVerificationCodeForm from './SendVerificationCodeForm'
import ValidateVerificationCode from './ValidateVerificationCodeForm'
import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import forgotPasswordApiClient from '../../api/forgotPassword'
import styles from './ForgotPasswordForm.scss'

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
    this.props.sendValidationCode(email)
  }

  async validate (values, dispatch) {
    const _error = 'Incorrect code, please try again!'
    const apiOptions = apiOptionsFromState()
    const response = await forgotPasswordApiClient.validateCode(apiOptions, this.props.email, values.code)
    if (response.status === 200) {
      return dispatch(push('/new-password'))
    } else {
      throw new SubmissionError({ code: response.statusText, _error })
    }
  }

  render () {
    const {page} = this.state
    const {error} = this.props
    console.log('error', error)
    return (
      <div>
        {page === 1 && <SendVerificationCodeForm onSubmit={this.nextPage} />}
        {page === 2 &&
        <div>
          <ValidateVerificationCode onSubmit={this.validate}/>
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
  error: PropTypes.any
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
  form: 'ForgotPasswordForm'
})(ForgotPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormRedux)
