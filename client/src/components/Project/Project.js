import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import emailApiClient from '../../api/email'
import styles from '../ListOfProjects/ListOfProjects.scss'

class Project extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.mailToOrganization = this.mailToOrganization.bind(this)
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this)
    this.getAppliedStatus = this.getAppliedStatus.bind(this)
  }

  handleClick () {
    const applied = this.getAppliedStatus()
    if (this.props.authenticated && !applied) {
      return this.mailToOrganization(this.props.project)
    }
  }

  mailToOrganization (project) {
    return emailApiClient.send(project).then(response => {
      this.props.applyForProject(project, this.props.user)
    })
  }

  renderProjectApplicationResult (project) {
    const applied = this.getAppliedStatus()
    if (applied) {
      return (
        <span className={styles.listApplyPass}>
          &#10004;
        </span>
      )
    } else {
      return (
        <span className={styles.listApplyFail}>
          &#10007;
        </span>
      )
    }
  }

  getAppliedStatus () {
    return (
      this.props.user.opportunitiesAppliedFor &&
      this.props.user.opportunitiesAppliedFor.includes(this.props.project._id)
    )
  }

  render () {
    const applied = this.getAppliedStatus()
    const liClassName = this.props.authenticated && !applied
      ? styles.listOrgAuthenticated
      : styles.listOrg

    return (
      <li
        onClick={this.handleClick.bind(this)}>
        {this.renderProjectApplicationResult(this.props.project)}
        <div className={liClassName}>
          Name:{this.props.project.name} Role:{this.props.project.role}
        </div>
      </li>
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
