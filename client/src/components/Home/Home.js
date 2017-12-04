import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectActionCreator from '../../actions/project'
import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Home extends Component {
  componentDidMount () {
    this.props.populateOpps()
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
  populateOpps: ProjectActionCreator.populateOpps
}

Home.propTypes = {
  projects: PropTypes.array,
  populateOpps: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
