import styles from './ListOfProjects.css'
import React from 'react'
import projects from '../../data/projects.json'

function ListOfProjects () {
  return (
    <section className={styles.orgSection}>
      <h1 className={styles.title}>Apply Below</h1>
      <ul>
        <li className={styles.listOrg}>Name:{projects[0].name} Role:{projects[0].role}</li>
        <li className={styles.listOrg}>Name:{projects[1].name} Role:{projects[1].role}</li>
        <li className={styles.listOrg}>Name:{projects[2].name} Role:{projects[2].role}</li>
        <li className={styles.listOrg}>Name:{projects[3].name} Role:{projects[3].role}</li>
        <li className={styles.listOrg}>Name:{projects[4].name} Role:{projects[4].role}</li>
      </ul>
    </section>
  )
}

export default ListOfProjects
