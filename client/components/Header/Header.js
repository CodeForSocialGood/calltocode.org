import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthActionCreator from '../../actions/auth'
import styles from './Header.scss'

class Header extends Component {
  constructor (props) {
    super(props)

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
  }

  renderHeaderButtons () {
    if (this.props.authenticated) {
      const authButtons = [
        <Link key="logout" to='/' onClick={this.props.logout} className={styles.button}>LOG OUT</Link>,
        <Link key="profile" to='/profile' className={styles.button}>PROFILE</Link>
      ]
      if (this.props.user.usertype === 'contact') {
        return [
          <Link key="create-project" to='/create-project' className={styles.button}>CREATE PROJECT</Link>,
          ...authButtons
        ]
      } else {
        return authButtons
      }
    } else {
      return ([
        <Link key='signup' to='/signup' className={styles.button}>SIGN UP</Link>,
        <Link key='login' to='/login' className={styles.button}>LOGIN</Link>
      ])
    }
  }

  render () {
    return (
      <header className={styles.header}>
        <Link to='/'>
          <img className={styles.logo} src={require('../../images/logo.png')} />
        </Link>
        <div className={styles.buttons}>
          {this.renderHeaderButtons()}
        </div>
      </header>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  }
}

const mapDispatchToProps = {
  logout: AuthActionCreator.logout
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
