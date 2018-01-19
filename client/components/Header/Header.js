import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'

import AuthActionCreator from '../../actions/auth'
import styles from './Header.scss'

class Header extends Component {
  constructor (props) {
    super(props)

    this.renderHeaderButtons = this.renderHeaderButtons.bind(this)
    this.getLinkStyles = this.getLinkStyles.bind(this)
  }

  renderHeaderButtons () {
    const { authenticated, user } = this.props

    if (authenticated) {
      return (
        <Fragment>
          { user.usertype === 'contact' &&
            <Button dense className={this.getLinkStyles('create-project')}
              component={Link}
              to="/create-project">
              {'CREATE PROJECT'}
            </Button>
          }
          <Button dense className={this.getLinkStyles()}
            component={Link}
            to="/"
            onClick={this.props.logout}>
            {'LOGOUT'}
          </Button>
          <Button dense className={this.getLinkStyles('profile')}
            component={Link}
            to="/profile">
            <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button dense className={this.getLinkStyles('signup')}
            component={Link}
            to="/signup">
            {'SIGN UP'}
          </Button>
          <Button dense className={this.getLinkStyles('login')}
            component={Link}
            to="/login">
            {'LOG IN'}
          </Button>
        </Fragment>
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
      <AppBar className={styles.header}
        position="static"
        color="inherit"
        elevation={0}>
        <Toolbar>
          <Typography className={`${styles.button} ${styles.flex}`}
            type="title" color="inherit"
            component={Link}
            to="/">
            {'calltocode'}
          </Typography>

          {this.renderHeaderButtons()}
        </Toolbar>
      </AppBar>
    )
  }
}

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
