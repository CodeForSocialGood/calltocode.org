import React, { Component } from 'react'

import styles from './About.scss'

class About extends Component {
  render () {
    return (
      <section className={styles.aboutSection}>
        <h1>Contact</h1>
        <p className={styles.aboutItem}>
          <span className={styles.aboutItemTitle}>Email: </span>
          <span>
            <a href="mailto:team.calltocode@gmail.com">
              team.calltocode@gmail.com
            </a>
          </span>
        </p>
        <p className={styles.aboutItem}>
          <span className={styles.aboutItemTitle}>Slack Channel: </span>
          <span>
            <a href="http://join-our-slack.code4socialgood.org">
              call-to-code-info
            </a>
          </span>
        </p>
        <h1>Mission Statement</h1>
        <p>
          A platform where college students can get development experience by
          matching them with nonprofits, calltocode.org is a nonprofit and open-sourced
          product built by volunteers to accomplish a positive mission.
        </p>
      </section>
    )
  }
}

export default About
