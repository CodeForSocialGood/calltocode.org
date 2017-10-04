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

  renderPassword (field) {
    return (
      <div className={styles.inputRow}>
        <input className={styles.inputPassword} type="password" placeholder="Password" {...field.input}/>
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
          component={this.renderPassword}
        />
        <button type="submit" className={styles.buttonSubmit}>Submit</button>
      </form>
    )
  }
}

const LoginForm = reduxForm({
  form: 'LoginForm'
})(Login)

function mapStateToProps (state) {
  return { loggedIn: state.loggedIn }
}

export default connect(mapStateToProps, { login })(LoginForm)

// () => login('kevin@email.com', 'kevin.password')
