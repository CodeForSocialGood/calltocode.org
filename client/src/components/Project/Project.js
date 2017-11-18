import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../ListOfProjects/ListOfProjects.scss'
import emailApiClient from '../../api/email'

class Project extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.mailToOrganization = this.mailToOrganization.bind(this)
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this)
  }

  handleClick () {
    if (this.props.loggedIn /* TODO && ! this.props.project.applied */) {
      return this.mailToOrganization(this.props.project)
    }
  }

  mailToOrganization (project) {
    return emailApiClient.send(project).then(response => {
      console.log(project)
      this.props.applyForProject(project)
    })
  }

  renderProjectApplicationResult (project) {
    if (this.props.project.applicationResult === true) {
      return (
        <span className={styles.listApplyPass}>
          &#10004;
        </span>
      )
    } else if (this.props.project.applicationResult === false) {
      return (
        <span className={styles.listApplyFail}>
          &#10007;
        </span>
      )
    } else { return null }
  }

  render () {
    // const applied = this.props.project.applicationResult === true || this.props.project.applicationResult === false
    const liClassName = this.props.loggedIn /* TODO && !applied */ ? styles.listOrgLoggedIn : styles.listOrg

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

Project.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  applyForProject: PropTypes.func.isRequired
}

export default Project
