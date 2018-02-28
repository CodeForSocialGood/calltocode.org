import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {default as constants} from '../../constants'

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default function (BaseComponent) {
  class Restricted extends Component {
    componentDidMount () {
      this.checkAuthentication(this.props)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication (params) {
      const { history } = params
      if (!params.authenticated) {
        history.replace({ pathname: '/login' })
      } else {
        if (!this.routesAvailableByUserType()) {
          history.replace({pathname: '/'})
        }
      }
    }

    routesAvailableByUserType () {
      switch (this.props.location.pathname) {
        case '/create-project':
          return this.props.user.usertype === constants.USER_TYPE_CONTACT
        default: return true
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated,
      user: state.user
    }
  }

  Restricted.propTypes = {
    location: PropTypes.object,
    user: PropTypes.object
  }

  return connect(mapStateToProps)(Restricted)
}
