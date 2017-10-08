import React from 'react'

import styles from './ListOfProjects.css'
import projects from '../../data/projects.json'
import emailApiClient from '../../api/email'

function ListOfProjects () {
  const projectListItems = projects.map((project, index) => {
    return (
      <li key={index} className={styles.listOrg} onClick={mailToOrganization(project)}>
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

export default ListOfProjects
