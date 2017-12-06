import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectActionCreator from '../../actions/project'
import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Profile extends Component {
  componentDidMount () {
    this.props.onLoad(this.props.user)
  }

  render () {
    const title = this.props.user.usertype === 'contact'
      ? 'Your Organization\'s Projects'
      : 'Projects Applied For'

    return (
      <ListOfProjects
        title={title}
        projects={this.props.projects} />
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects,
    user: state.user
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchProfileProjects
}

Profile.propTypes = {
  onLoad: PropTypes.func,
  projects: PropTypes.array,
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
