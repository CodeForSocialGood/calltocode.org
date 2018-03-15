
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './LandingF.scss';
import logo from '../../images/logo-home.png';
import facebook from '../../images/facebook.png';
import linkedIn from '../../images/linked-in.png';
import pininterest from '../../images/pininterest.png';
import twitter from '../../images/twitter.png';
import c3nonprofit from '../../images/501-c-3-nonprofit.png';


class Footer extends React.Component {
  render(){
    return (
      <div className={styles.container}>
        <div className={styles.column1}>
          <img src={logo} alt="Call to code logo" className={styles.logoHome} />
          <p><img src={c3nonprofit} className="nonProfit" /></p>
        </div>


        <div className={styles.column2}>
          <ul className={styles.list}>
            <li className={styles.projects}><a href="#" {styles.link}>Projects</a></li>
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
};


export default Footer
