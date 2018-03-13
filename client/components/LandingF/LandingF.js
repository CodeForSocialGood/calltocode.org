import React from 'react'
import ReactDOM from 'react-dom'
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
          <img src={logo} alt="Call to code logo" className="logo-home">
          <p><img src={501-c-3-nonprofit} className="non-profit"></p>
        </div>


        <div className={styles.column2}>
          <ul className={styles.list}>
            <li className={styles.product}>Product</li>
            <li className={styles.list-items styles.popular}><a href="#">Popular</li>
            <li className={styles.list-items}><a href="#">Trending</li>
            <li className={styles.list-items}><a href="#">Catalog</li>
          </ul>
        </div>

        <div className={styles.column3}>
          <ul className={styles.list}>
            <li className={styles.company}>Company</li>
            <li className={styles.list-items styles.press}><a href="#">Press</a></li>
            <li className={styles.list-items}><a href="#">Releases</li>
            <li className={styles.list-items}><a href="#">Mission</li>
            <li className={styles.list-items}><a href="#">Strategy</li>
            <li className={styles.list-items}><a href="#">Works</li>
          </ul>
        </div>

        <div className={styles.column3}>
          <p className={styles.FOLLOW-US}>FOLLOW US</p>
          <div className={styles.social-media}>
            <a href="#"><img src={facebook} alt="facebook logo" className="facebook"></a>
            <a href="#"><img src={twitter} alt="twitter logo" className="twitter"></a>
            <a href="#"><img src={linked-in} alt="linkedin logo" className="linked-in"></a>
            <a href="#"><img src={pininterest} alt="pininterest logo" className="pininterest"></a>
        </div>
        </div>
      </div>
    )
  }
};


export default LandingF
