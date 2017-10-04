import styles from '../Login/Login.css'
import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailField: '',
      passwordField: ''
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log('An email was submitted: ' + this.state.emailField);
    console.log('A password was submitted: ' + this.state.emailField);
    event.preventDefault();
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>
        <input className={styles.inputEmail} type="text" name="emailField" value={this.state.emailField} placeholder="Email" onChange={this.handleStateChange} />
        <input className={styles.inputPassword} type="password" name="passwordField" value={this.state.passwordField} placeholder="Password" onChange={this.handleStateChange} />
        <input className={styles.buttonSubmit} type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default Signup