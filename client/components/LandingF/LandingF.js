<<<<<<< HEAD
import React from 'react'
<<<<<<< HEAD
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
=======
import ReactDOM from 'react-dom'
=======

>>>>>>> remove first 2 lines
import React, { Component } from 'react'
import styles from './LandingF.scss'
import logo from '../../images/logo-home.png'
import facebook from '../../images/facebook.png'
import linked-in from '../../images/linked-in.png'
import pininterest from '../../images/pininterest.png'
import twitter from '../../images/twitter.png'
import 501-c-3-nonprofit from '../../images/501-c-3-nonprofit.png'


class Footer extends React.Component {
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.column1}>
          <img src={logo} alt="Call to code logo" className="logo-home" />
          <p><img src={501-c-3-nonprofit} className="non-profit" /></p>
        </div>


        <div className={styles.column2}>
          <ul className={styles.list}>
            <li className={styles.product}>Product</li>
<<<<<<< HEAD
            <li className={styles.list-items styles.popular}><a href="#">Popular</li>
            <li className={styles.list-items}><a href="#">Trending</li>
            <li className={styles.list-items}><a href="#">Catalog</li>
>>>>>>> feature #155111485- Visitor sees landing page(Section F)
=======
            <li className={styles.list-items styles.popular}>Popular</li>
            <li className={styles.list-items}>Trending</li>
            <li className={styles.list-items}>Catalog</li>
>>>>>>> commented out the images
          </ul>
        </div>

        <div className={styles.column3}>
          <ul className={styles.list}>
<<<<<<< HEAD
            <li className={styles.about}><a href="#" className={styles.link}>About</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
=======
            <li className={styles.company}>Company</li>
            <li className={styles.list-items styles.press}>Press</a></li>
            <li className={styles.list-items}>Releases</li>
            <li className={styles.list-items}>Mission</li>
            <li className={styles.list-items}>Strategy</li>
            <li className={styles.list-items}>Works</li>
          </ul>
        </div>

        <div className={styles.column3}>
          <p className={styles.FOLLOW-US}>FOLLOW US</p>
          <div className={styles.social-media}>
            <a href="#"><img src={facebook} alt="facebook logo" className="facebook" /></a>
            <a href="#"><img src={twitter} alt="twitter logo" className="twitter" /></a>
            <a href="#"><img src={linked-in} alt="linkedin logo" className="linked-in" /></a>
            <a href="#"><img src={pininterest} alt="pininterest logo" className="pininterest" /></a>
        </div>
        </div>
      </div>
    )
  }
};


export default LandingF
>>>>>>> feature #155111485- Visitor sees landing page(Section F)
