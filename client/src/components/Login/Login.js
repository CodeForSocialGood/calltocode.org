import styles from './Login.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { login } from '../../actions'

class Login extends Component {
  renderEmail (field) {
    return (
      <div className={styles.inputRow}>
        <input
          className={styles.inputEmail}
          type="text"
          placeholder="Email"
          {...field.input}
        />
      </div>
    )
  }

  onSubmit (values) {
    console.log('values', values)
    this.props.login(values.email, values.password)
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1 className={styles.title}>Login</h1>

        <Field
          name="email"
          component={this.renderEmail}
        />
        <Field
          name="password"
          component={(field) => <div className={styles.inputRow}><input className={styles.inputPassword} type="password" placeholder="Password" {...field.input}/></div>}
        />
        <button type="submit" className={styles.buttonSubmit}>Submit</button>
      </form>
    )
  }
}

function validate (values) {
  console.log('validate values', values)
  return {}
}

const LoginForm = reduxForm({
  validate,
  form: 'LoginForm'
})(Login)

// export default LoginForm

export default connect(null, { login })(LoginForm)

// () => login('kevin@email.com', 'kevin.password')
