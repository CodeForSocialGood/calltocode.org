import React, { Fragment } from 'react'
import styles from './LandingB.scss'
import createProfileIcon from '../../images/createProfileIcon.svg'
import searchProjectsIcon from '../../images/searchProjectsIcon.svg'
import applyForProjectsIcon from '../../images/applyForProjectsIcon.svg'

const LandingB = () => {
  return (
    <Fragment>
      <div className={styles.globalNetwork}>
      Global network for social good
      </div>
      <div className={styles.volunteerOrgButtons}>
        <div className={styles.volunteers}>Volunteers</div>
        <div className={styles.organizations}>Organizations</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.createProfile}>

          <img src={createProfileIcon} className={styles.icon} />

          <div className={styles.subtitle}>Create profile</div>
          <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus pretium purus. Phasellus dignissim, justo nec efficitur fringilla,</div>
        </div>
        <div className={styles.searchProjects}>

          <img src={searchProjectsIcon} className={styles.icon} />

          <div className={styles.subtitle}>Search Projects</div>
          <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus pretium purus. Phasellus dignissim, justo nec efficitur fringilla,</div>
        </div>
        <div className={styles.applyForProjects}>

          <img src={applyForProjectsIcon} className={styles.icon} />

          <div className={styles.subtitle}>Apply for projects</div>
          <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus pretium purus. Phasellus dignissim, justo nec efficitur fringilla,</div>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingB
