import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Validators from '../Utils/Validators'
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import TextField from 'material-ui/TextField'

class PasswordInput extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      validationVisible: false,
      error: {}
    }
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onFocus (event) {
    event.preventDefault()
    this.setState({ validationVisible: true })
  }

  onBlur (event) {
    event.preventDefault()
    this.setState({ validationVisible: false })
  }
  onChange (event) {
    event.preventDefault()
    const value = event.target.value
    const errors = Validators.validatePassword(value)
    this.setState({ error: errors })

    this.props.onChangePassword(event)

    if (this.props.hasErrors) {
      this.props.hasErrors(errors !== undefined && Object.values(errors).includes(false))
    }
  }

  render () {
    const { fullWidth, inputClassName, nameTextField } = this.props
    return (
      <Fragment >
        <TextField required id="pass"
          label="Password" type="password" error={this.state.error !== undefined && Object.values(this.state.error).includes(false)}
          fullWidth={fullWidth} className={inputClassName}
          name={nameTextField}
          onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
        <ValidationPopup active={this.state.validationVisible} error={this.state.error} name="popup" />
      </Fragment>
    )
  }
}

PasswordInput.propTypes = {
  onChangePassword: PropTypes.func.isRequired,
  inputClassName: PropTypes.string,
  fullWidth: PropTypes.bool,
  nameTextField: PropTypes.string,
  hasErrors: PropTypes.func
}

export default PasswordInput
