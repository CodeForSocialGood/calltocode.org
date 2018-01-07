import React from 'react'
import PropTypes from 'prop-types'

import styles from './SignupForm.scss'

const ValidationPopup = ({ error, active }) => {
  return (
    <div className={`${styles.validationPopup} ${active ? styles.show : styles.hide}` }>
      <p className={styles.bold}>Password must have</p>
      <ul>
        <li className={ error == null || error.upperCase ? styles.tick : styles.cross }> at least 1 UpperCase Character </li>
        <li className={ error == null || error.lowerCase ? styles.tick : styles.cross }> at least 1 LowerCase Character </li>
        <li className={ error == null || error.hasOneDigit ? styles.tick : styles.cross }> at least 1 Number </li>
        <li className={ error == null || error.hasSpecialChar ? styles.tick : styles.cross }> at least 1 Special Character </li>
        <li className={ error == null || error.minLength ? styles.tick : styles.cross }> at least 10 Characters </li>
        <li className={ error == null || error.maxLength ? styles.tick : styles.cross }> at most 128 Characters </li>
        <li className={ error == null || error.noIdenticalChars ? styles.tick : styles.cross }> not more than 2 identical characters in a row </li>
      </ul>
    </div>
  )
}

ValidationPopup.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.object
}

export default ValidationPopup
