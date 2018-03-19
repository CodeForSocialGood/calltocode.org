import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectActionCreator from '../../actions/project'
import PropTypes from 'prop-types'

class ProjectDetail extends Component {
  constructor (args) {
    super(args)
    this.state = { projectId: this.props.match.params.id }
  }

  componentDidMount () {
    this.props.fetchProjectById(this.state.projectId)
  }

  renderApplication (application) {
    return (
      <div>
        <p>
          {application.volunteer.email}
        </p>
        <p>
          Submitted at: {application.createdAt}
        </p>
      </div>
    )
  }

  render () {
    const project = this.props.project || {}
    const applications = project.applications || []
    if (applications.length === 0) {
      return (<h2>No one applied this project</h2>)
    } else {
      return (
        <div>
          <ul>
            {
              applications.map((app) => <li key={app.id}> {this.renderApplication(app)} </li>)
            }
          </ul>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  fetchProjectById: ProjectActionCreator.fetchProjectById
}

const mapStateToProperties = (state) => {
  return {project: state.project.project || {}}
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
  fetchProjectById: PropTypes.func,
  match: PropTypes.object
}

export default connect(mapStateToProperties, mapDispatchToProps)(ProjectDetail)
