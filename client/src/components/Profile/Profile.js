import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Profile extends Component {
  constructor(props) {
    super(props)

    TODO:// getListOfProjects from opportunitiesAppliedFor in user object
  }

  render () {
    return (
      <ListOfProjects projects={} />
    )
  }
}

Profile.propTypes = {
  user: PropTypes.obj.isRequired
}

function mapStateToProps (state) {
  return { user: state.login.user }
}

export default connect(mapStateToProps, null)(Profile)
