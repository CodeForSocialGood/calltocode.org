
import styles from './ListOfOrganization.css'
import React from 'react'

function ListOfOrganization () {
  return (
    <section className={styles.orgSection}>
      <h1 className={styles.title}>Apply Below</h1>
      <ul className={styles.listOrg}>
        <li>Name:Organization1 Role:Role1</li>
        <li>Name:Organization2 Role:Role2</li>
        <li>Name:Organization3 Role:Role3</li>
        <li>Name:Organization4 Role:Role4</li>
        <li>Name:Organization5 Role:Role5</li>
      </ul>
    </section>
  )
}

export default ListOfOrganization
