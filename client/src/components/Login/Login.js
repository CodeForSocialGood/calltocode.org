import styles from './Login.css'
import React from 'react'

function Login () {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.inputRow}><input className={styles.inputEmail} type="text" placeholder="Email" /></div>
      <div className={styles.inputRow}><input className={styles.inputPassword} type="password" placeholder="Password" /></div>
      <div className={styles.inputRow}><input className={styles.buttonSubmit} type="submit" value="Login" /></div>
    </form>
  )
}

export default Login
