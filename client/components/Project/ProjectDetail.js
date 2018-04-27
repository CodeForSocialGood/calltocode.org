import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectActionCreator from '../../actions/project'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Card, {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import styles from './ProjectDetail.scss'

class ProjectDetail extends Component {
  componentDidMount () {
    this.props.fetchProjectById(this.props.match.params.id)
  }

  renderApplication (application) {
    return (
      <Card>
        <CardContent>
          <Typography>
            Applicant: {application.volunteer.email}
          </Typography>
          <Typography expandable={true}>
            Message: {application.message}
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
    return applications.length === 0 ? (
      <div>
        <h1>No one had applied this project</h1>
        <p className={styles.goBack}>
          <Link to={`/profile`}>Go Back</Link>
        </p>
      </div>) : (
      <div>
        <h1>The following applicants applied this project:</h1>
        <ul>
          {
            applications.map((app) => <li key={app.id}> {this.renderApplication(app)} </li>)
          }
        </ul>
        <p className={styles.goBack}>
          <Link to={`/profile`} >Go Back</Link>
        </p>
      </div>)
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
