import styles from './Login.css'
import React from 'react'

function Login () {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Login</h1>
      <input className={styles.inputEmail} type="text" placeholder="Email" />
      <input className={styles.inputPassword} type="password" placeholder="Password" />
      <input className={styles.buttonSubmit} type="submit" value="Login" />
    </form>
  )
}

export default Login
