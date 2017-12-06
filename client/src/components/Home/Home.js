import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectActionCreator from '../../actions/project'
import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Home extends Component {
  componentDidMount () {
    this.props.onLoad()
  }

  render () {
    return (
      <ListOfProjects
        title={'Click To Apply'}
        projects={this.props.projects} />
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchAllProjects
}

Home.propTypes = {
  onLoad: PropTypes.func,
  projects: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
