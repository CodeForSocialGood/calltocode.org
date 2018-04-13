import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingE.scss'
import Button from 'material-ui/Button'
import github from '../../images/github-64x64.png'
import slack from '../../images/slack-64x64.png'

class LandingE extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <h1 className="#">By Volunteers, For Volunteers</h1>

        <div>
          <a href="#">
            <button className={styles.github}>
            <span><img src={github} alt="github logo"/></span>
              <span className={styles.contribute}>CONTRIBUTE TO PROJECTS</span>
            </button>
          </a>
        </div>

        <div>
          <a href="#">
            <button className={styles.slack}>
              <span><img src={slack} alt="slack logo"/></span>
              <span className={styles.community}>JOIN THE COMMUNITY</span>
            </button>
          </a>
        </div>

      < /div>
    )
  }
}

export default LandingE
