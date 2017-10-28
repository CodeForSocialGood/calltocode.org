import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { logout } from '../../actions'
import styles from './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props);

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this);
  }

  renderHeaderButtons() {

    if (this.props.loggedIn) {
      return (
        <Link to='/' onClick={this.props.logout} className={styles.button}>LOG OUT</Link>
      );
    }
    else {
      return ([
        <Link key='signup' to='/signup' className={styles.button}>SIGN UP</Link>,
        <Link key='login' to='/login' className={styles.button}>LOGIN</Link>
      ]);
    }
  }

  render () {

    return (
      <header className={styles.header}>
        <img className={styles.logo} src={require('../../../images/logo.png')} />
        <div className={styles.buttons}>
          {this.renderHeaderButtons()}
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return { loggedIn: state.login.loggedIn }
}

export default connect(mapStateToProps, { logout })(Header)
