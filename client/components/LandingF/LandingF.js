import React from 'react'
import styles from './LandingF.scss'
import logoV from '../../images/logo-home-video-copy.png'
import c3nonprofit from '../../images/501-c-3-nonprofit.png'

class Footer extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.column1}>
          <img src={logoV} alt="Call to code logo"/>
          <p><img src={c3nonprofit} className={styles.nonProfit} /></p>
        </div>

        <div className={styles.column2}>
          <ul className={styles.list}>
            <li className={styles.projects}><a href="#" className={styles.link}>Projects</a></li>
          </ul>
        </div>

        <div className={styles.column3}>
          <ul className={styles.list}>
            <li className={styles.about}><a href="#" className={styles.link}>About</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
