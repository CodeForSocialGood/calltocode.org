import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../ListOfProjects/ListOfProjects.scss'
import emailApiClient from '../../api/email'

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
    if (this.props.loggedIn && !applied) {
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

  render () {
    const applied = this.getAppliedStatus()
    const liClassName = this.props.loggedIn && !applied
      ? styles.listOrgLoggedIn
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

  getAppliedStatus () {
    return this.props.user.opportunitiesAppliedFor.indexOf(this.props.project._id) !== -1
  }
}

Project.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  user: PropTypes.object,
  applyForProject: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, null)(Project)
