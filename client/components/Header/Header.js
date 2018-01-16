import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import AuthActionCreator from '../../actions/auth'
import styles from './Header.scss'

class Header extends Component {
  constructor (props) {
    super(props)

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
    this.getLinkStyles = this.getLinkStyles.bind(this)
  }

  renderHeaderButtons () {
    if (this.props.authenticated) {
      const authButtons = [
        <Link key="logout" to='/' onClick={this.props.logout} className={this.getLinkStyles()}>LOG OUT</Link>,
        <Link key="profile" to="/profile" className={this.getLinkStyles('profile')}>PROFILE</Link>
      ]
      if (this.props.user.usertype === 'contact') {
        return [
          <Link key="create-project" to="/create-project" className={this.getLinkStyles('create-project')}>CREATE PROJECT</Link>,
          ...authButtons
        ]
      } else {
        return authButtons
      }
    } else {
      return ([
        <Link key="signup" to="/signup" className={this.getLinkStyles('signup')}>SIGN UP</Link>,
        <Link key="login" to='/login' className={this.getLinkStyles('login')}>LOG IN</Link>
      ])
    }
  }

  getLinkStyles (page) {
    return this.props.currentPage.includes(page)
      ? `${styles.button} ${styles.active}`
      : `${styles.button}`
  }

  render () {
    return (
      <div className={styles.headerRoot}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Typography type="title" color="inherit" className={styles.flex}>
              <Link to="/">calltocode</Link>
            </Typography>
            {this.renderHeaderButtons()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


      // <header className={styles.header}>
      //   <Link to='/'>
      //     <img className={styles.logo} src={require('../../images/logo.png')} />
      //   </Link>
      //   <div className={styles.buttons}>
      //     {this.renderHeaderButtons()}
      //   </div>
      // </header>

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    currentPage: state.routing.location.pathname,
    user: state.user
  }
}

const mapDispatchToProps = {
  logout: AuthActionCreator.logout
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
