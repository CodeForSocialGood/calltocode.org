import React from 'react'
import PropTypes from 'prop-types'

import styles from './SignupForm.scss'

const getTickOrCross = (error, errorKey) => {
  const isError = error === null || error[errorKey]
  return isError ? styles.tick : styles.cross
}

const ValidationPopup = ({ error, active }) => {
  return (
    <div className={`${styles.validationPopup} ${active ? styles.show : styles.hide}` }>
      <p className={styles.bold}>Password must have</p>
      <ul>
        <li className={ getTickOrCross(error, 'upperCase') }> at least 1 UpperCase Character </li>
        <li className={ getTickOrCross(error, 'lowerCase') }> at least 1 LowerCase Character </li>
        <li className={ getTickOrCross(error, 'hasOneDigit') }> at least 1 Number </li>
        <li className={ getTickOrCross(error, 'hasSpecialChar') }> at least 1 Special Character </li>
        <li className={ getTickOrCross(error, 'minLength') }> at least 10 Characters </li>
        <li className={ getTickOrCross(error, 'maxLength') }> at most 128 Characters </li>
        <li className={ getTickOrCross(error, 'noIdenticalChars') }> not more than 2 identical characters in a row </li>
      </ul>
    </div>
  )
}

ValidationPopup.propTypes = {
  active: PropTypes.bool,
  error: PropTypes.object
}

export default ValidationPopup
