<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> few more bugs fixed
import React from 'react'
import styles from './LandingF.scss'
import logoV from '../../images/logo-home-video-copy.png'
import c3nonprofit from '../../images/501-c-3-nonprofit.png'
=======

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './LandingF.scss';
import logoV from '../../images/logo-home-video-copy.png';
import facebook from '../../images/facebook.png';
import linkedIn from '../../images/linked-in.png';
import pininterest from '../../images/pininterest.png';
import twitter from '../../images/twitter.png';
import c3nonprofit from '../../images/501-c-3-nonprofit.png';

>>>>>>> changed logo image

class Footer extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.column1}>
          <img src={logoV} alt="Call to code logo"/>
<<<<<<< HEAD
          <p><img src={c3nonprofit} className={styles.nonProfit} /></p>
=======
          <p><img src={c3nonprofit} className="nonProfit" /></p>
>>>>>>> changed logo image
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
<<<<<<< HEAD
}
=======
};
>>>>>>> few more bugs fixed

export default Footer
