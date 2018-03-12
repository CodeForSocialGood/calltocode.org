import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'

import AuthActionCreator from '../../actions/auth'
import styles from './Header.scss'
import ApplicationActionCreator from '../../actions/application'

class Header extends Component {
  constructor (props) {
    super(props)

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
    this.getLinkStyles = this.getLinkStyles.bind(this)
    this.renderNotificationBadge = this.renderNotificationBadge.bind(this)
  }

  componentDidMount () {
    if (this.props.authenticated) {
      this.props.getNotifications()
    }
  }

  renderNotificationBadge () {
    const { applications } = this.props
    return applications &&
    <Link key="show-applications" to="/show-applications" className={this.getLinkStyles('show-project')}>
      {applications.notSeenCounter > 0 ? <Badge badgeContent={applications.notSeenCounter} color="primary" >
        <span className={styles.applicationBadgeText}>APPLICATIONS</span>
      </Badge> : <span className={styles.applicationBadgeText}>APPLICATIONS</span>}
    </Link>
  }

  renderHeaderButtons () {
    if (this.props.authenticated) {
      const authButtons = [
        <Link key="logout" to='/' onClick={this.props.logout} className={this.getLinkStyles()}>LOG OUT</Link>,
        <Link key="profile" to="/profile" className={this.getLinkStyles('profile')}>PROFILE</Link>
      ]
      if (this.props.user.usertype === 'contact') {
        return [
          this.renderNotificationBadge(),
          <Link key="create-project" to="/create-project" className={this.getLinkStyles('create-project')}>CREATE PROJECT</Link>,
          ...authButtons
        ]
      } else {
        return authButtons
      }
    } else {
      return (
        <div>
          <Link key="signup" to="/signup" className={this.getLinkStyles('signup')}>SIGN UP</Link>
          <Link key="login" to='/login' className={this.getLinkStyles('login')}>LOG IN</Link>
        </div>
      )
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
              <Link to="/" className={styles.button}>calltocode</Link>
            </Typography>
            {this.renderHeaderButtons()}
            <Link key="about" to="/about" className={this.getLinkStyles('about')}>ABOUT</Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    applications: state.application,
    authenticated: state.auth.authenticated,
    currentPage: state.routing.location.pathname,
    user: state.user,
    login: state.login
  }
}

const mapDispatchToProps = {
  logout: AuthActionCreator.logout,
  getNotifications: ApplicationActionCreator.getNotifications
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  login: PropTypes.object,
  applications: PropTypes.shape({
    applications: PropTypes.any,
    fetching: PropTypes.bool,
    notSeenCounter: PropTypes.number
  }),
  getNotifications: PropTypes.func

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
