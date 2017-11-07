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
  }

  renderListOfProjects () {
    const liClassName = this.props.loggedIn ? styles.listOrgLoggedIn : styles.listOrg

    return this.projects.map((project, index) => {
      return (
        <li
          key={index}
          className={liClassName}
          onClick={this.props.loggedIn ? mailToOrganization(project) : null}>
          Name:{project.name} Role:{project.role}
        </li>
      )
    })
  }

  render () {
    return (
      <section className={styles.orgSection}>
        <h1 className={styles.title}>Apply Below</h1>
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
  loggedIn: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(ListOfProjects)
