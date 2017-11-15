import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './ListOfProjects.scss'
import defaultProjects from '../../data/projects.json'
import emailApiClient from '../../api/email'

import { connect } from 'react-redux'

class ListOfProjects extends Component {
  constructor (props) {
    super(props)

    this.renderListOfProjects = this.renderListOfProjects.bind(this)
    this.projects = this.props.projects || defaultProjects
    this.title = this.props.title || "Apply Below"
  }

  renderListOfProjects () {
    const liClassName = this.props.loggedIn ? styles.listOrgLoggedIn : styles.listOrg

    return this.projects.map((project, index) => {
      if( project.name && project.role ) {
        return (
          <li
            key={index}
            className={liClassName}
            onClick={this.props.loggedIn ? mailToOrganization(project) : null}>
            Name:{project.name} Role:{project.role}
          </li>
        )
      }
    })
  }

  render () {
    return (
      <section className={styles.orgSection}>
        <h1 className={styles.title}>{this.title}</h1>
        <ul>
          {this.renderListOfProjects()}
        </ul>
      </section>
    )
  }
}

function mailToOrganization (project) {
  return () => {
    const {email, name, role} = project
    const projectInfo = {email, name, role}

    emailApiClient.send(projectInfo)
  }
}

function mapStateToProps (state) {
  return { loggedIn: state.login.loggedIn }
}

ListOfProjects.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  title: PropTypes.string
}

export default connect(mapStateToProps)(ListOfProjects)
