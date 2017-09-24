/**
 * Created by ravi on 9/24/17.
 */
import styles from './ListOfOrganization.css'
import React from 'react'

function ListOfOrganization () {
  return (
    <form className={styles.form}>
      <button className={styles.loginButton}>LOGIN</button>
      <button className={styles.signUpButton}>SIGN UP</button>
      <h1 className={styles.title}>Apply Below</h1>
      <ul className={styles.listOrg}>
        <li>Name:Organization1 Role:Role1</li>
        <li>Name:Organization2 Role:Role2</li>
        <li>Name:Organization3 Role:Role3</li>
        <li>Name:Organization4 Role:Role4</li>
        <li>Name:Organization5 Role:Role5</li>
      </ul>
    </form>
  )
}

export default ListOfOrganization
