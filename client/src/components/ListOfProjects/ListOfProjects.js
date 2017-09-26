import styles from './ListOfProjects.css'
import React from 'react'
import projects from '../../data/projects.json'

function ListOfProjects () {
  const projectListItems = projects.map((project, index) => {
    return <li key={index} className={styles.listOrg} onClick={mailToOrganization(project)}>Name:{project.name} Role:{project.role}</li>
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
    window.open(`mailto:${project.email}?subject=${project.name}&body=I am interested in the role ${project.role}`)
  }
}

export default ListOfProjects
