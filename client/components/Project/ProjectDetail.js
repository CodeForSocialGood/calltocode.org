import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectActionCreator from '../../actions/project'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Card, {CardHeader, CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography';


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
      <Card>
        <CardHeader
          title= {application.volunteer.email}
        />
        <CardContent>
          <Typography>
           message: {application.message}
          </Typography>

          <Typography>
            Submitted at: {application.createdAt}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  render () {
    const project = this.props.project || {}
    const applications = project.applications || []
    if (applications.length === 0) {
      return (
        <div>
          <h1>No one applied this project</h1>
          <Link to={`/profile`}>Go Back</Link>
        </div>)
    } else {
      return (
        <div>
          <h1>The following applicants applied this project:</h1>
          <ul>
            {
              applications.map((app) => <li key={app.id}> {this.renderApplication(app)} </li>)
            }
          </ul>
          <Link to={`/profile`} >Go Back</Link>
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
