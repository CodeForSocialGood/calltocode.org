import styles from './Header.css'
import React from 'react'

import { Link } from 'react-router-dom'

function Header () {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.button}>SIGN UP</Link>
      <Link to='/login' className={styles.button}>LOGIN</Link>
    </header>
  )
}

export default Header
