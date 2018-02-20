import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import styles from './LandingA.scss'
import logo from '../../images/logo-home.png'
import neonLike from '../../images/neon-like.png'

const LandingA = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link to="/">
          <img src={logo} alt="Call to code logo" />
        </Link>
        <div>
          <Button to="/" component={Link} className={styles.navLink}>
            PROJECTS
          </Button>
          <Button to="/login" component={Link} className={styles.navLink}>
            LOG IN
          </Button>
          <Button to="/signup" component={Link} className={styles.navButton}>
            SIGN UP
          </Button>
        </div>
      </div>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroHeader}>
            Change the world with your code.
          </h1>
          <div>
            <Button to="/" component={Link} className={styles.heroButton}>
              FIND PROJECTS
            </Button>
          </div>
        </div>
        <div className={styles.heroRight}>
          <img src={neonLike} alt="Neon like" />
        </div>
      </div>
    </div>
  )
}

export default LandingA
