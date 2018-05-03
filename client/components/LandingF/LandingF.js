<<<<<<< HEAD
import React from 'react'
=======

import React, { Component } from 'react'
>>>>>>> remove first 2 lines
import styles from './LandingF.scss'
<<<<<<< HEAD
import logoV from '../../images/logo-home-video-copy.png'
import c3nonprofit from '../../images/501-c-3-nonprofit.png'
=======
import logo from '../../images/logo-home.png'
import facebook from '../../images/facebook.png'
import linked-in from '../../images/linked-in.png'
import pininterest from '../../images/pininterest.png'
import twitter from '../../images/twitter.png'
import 501-c-3-nonprofit from '../../images/501-c-3-nonprofit.png'

>>>>>>> put images back with closing tag

class Footer extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.column1}>
<<<<<<< HEAD
          <img src={logoV} alt="Call to code logo"/>
          <p><img src={c3nonprofit} className={styles.nonProfit} /></p>
=======
          <img src={logo} alt="Call to code logo" className="logo-home" />
          <p><img src={501-c-3-nonprofit} className="non-profit" /></p>
>>>>>>> put images back with closing tag
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
<<<<<<< HEAD
=======

        <div className={styles.column3}>
          <p className={styles.FOLLOW-US}>FOLLOW US</p>
          <div className={styles.social-media}>
            <a href="#"><img src={facebook} alt="facebook logo" className="facebook" /></a>
            <a href="#"><img src={twitter} alt="twitter logo" className="twitter" /></a>
            <a href="#"><img src={linked-in} alt="linkedin logo" className="linked-in" /></a>
            <a href="#"><img src={pininterest} alt="pininterest logo" className="pininterest" /></a>
        </div>
        </div>
>>>>>>> put images back with closing tag
      </div>
    )
  }
}

export default Footer
