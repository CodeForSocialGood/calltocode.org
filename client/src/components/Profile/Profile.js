import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getOppsAppliedFor } from '../../actions'
import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Profile extends Component {
  componentDidMount () {
    this.props.getOppsAppliedFor(this.props.user)
  }

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
  opps: PropTypes.array,
  getOppsAppliedFor: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.login.user,
    opps: state.login.opps
  }
}

export default connect(mapStateToProps, { getOppsAppliedFor })(Profile)
