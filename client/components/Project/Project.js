import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GridTile } from 'material-ui/GridList'

import styles from './Project.scss'

class Project extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this)
    this.getAppliedStatus = this.getAppliedStatus.bind(this)
  }

  handleClick () {
    const { authenticated, project, user } = this.props
    const applied = this.getAppliedStatus()

    if (!applied && authenticated && user.usertype === 'volunteer') {
      return this.props.applyForProject(project, user)
    }
  }

  renderProjectApplicationResult (project) {
    const applied = this.getAppliedStatus()
    const isContact = this.isUserTypeContact()
    if (applied && !isContact) {
      return (
        <span className={styles.projectApplyPass}>&#10004;</span>
      )
    } else if (!isContact) {
      return (
        <span className={styles.projectApplyFail}>&#10007;</span>
      )
    }
  }

  getAppliedStatus () {
    return (
      this.props.user.projectsAppliedFor &&
      this.props.user.projectsAppliedFor.includes(this.props.project.id)
    )
  }

  isUserTypeContact () {
    return this.props.user.usertype === 'contact'
  }

  render () {
    const { project } = this.props

    const applied = this.getAppliedStatus()
    const isContact = this.isUserTypeContact()
    let projectClasses = styles.project
    if (this.props.authenticated && !applied && !isContact) {
      projectClasses = styles.projectAuthenticated
    } else if (this.props.authenticated && !applied) {
      projectClasses = styles.projectAuthenticatedContact
    }

    return (
      <GridTile className={projectClasses}
        onClick={this.handleClick.bind(this)}
        title={project.name}
        subtitle={project.organization.name || 'Organization Name'}
        actionIcon={this.renderProjectApplicationResult(project)}>
        <img src={project.image || require('../../images/logo.png')} />
      </GridTile>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

Project.propTypes = {
  applyForProject: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default connect(mapStateToProps, null)(Project)
