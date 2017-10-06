import styles from '../Login/Login.css'
import React from 'react'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      emailField: '',
      passwordField: ''
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFieldChange (event) {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    console.log(`An email was submitted: ${this.state.emailField}`)
    console.log(`A password was submitted: ${this.state.passwordField}`)
    event.preventDefault()
  }

  render () {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>

        <input className={styles.inputEmail} type="text" name="emailField" value={this.state.emailField}
          placeholder="Email" onChange={this.handleFieldChange} />

        <input className={styles.inputPassword} type="password" name="passwordField" value={this.state.passwordField}
          placeholder="Password" onChange={this.handleFieldChange} />

        <input className={styles.buttonSubmit} type="submit" value="Sign Up" />
      </form>
    )
  }
}

export default Signup
