import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated
    }
  }

  Restricted.propTypes = {
    location: PropTypes.object
  }

  return connect(mapStateToProps)(Restricted)
}
