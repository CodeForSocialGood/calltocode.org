import React from 'react'
import PropTypes from 'prop-types'

import styles from './ListOfProjects.css'
import projects from '../../data/projects.json'
import emailApiClient from '../../api/email'

import { connect } from 'react-redux'

function ListOfProjects (props) {
  const liClassName = props.loggedIn ? styles.listOrgLoggedIn : styles.listOrg
  const liOnClick = props.loggedIn ? (project) => mailToOrganization(project) : null
  const projectListItems = projects.map((project, index) => {
    return (
      <li key={index} className={liClassName} onClick={liOnClick}>
        Name:{project.name} Role:{project.role}
      </li>
    )
  })

  return (
    <section className={styles.orgSection}>
      <h1 className={styles.title}>Apply Below</h1>
      <ul>
        {projectListItems}
      </ul>
    </section>
  )
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
