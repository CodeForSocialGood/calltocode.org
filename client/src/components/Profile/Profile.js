import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Profile extends Component {
  render () {
    return (
      <ListOfProjects
        title={'Opportunities Applied For'}
        projects={this.props.opps} />
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  opps: PropTypes.array
}

function mapStateToProps (state) {
  return {
    user: state.login.user,
    opps: state.login.opps
  }
}

export default connect(mapStateToProps, null)(Profile)
