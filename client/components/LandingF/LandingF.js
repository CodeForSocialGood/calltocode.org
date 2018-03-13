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
            <li className={styles.about}><a href="/about" className={styles.link}>About</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
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
