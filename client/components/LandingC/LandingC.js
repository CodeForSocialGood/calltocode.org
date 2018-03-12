import React, { Component } from 'react'
import styles from './LandingC.scss'
import map from '../../images/map.png'
import { callToCodeEfforts } from '../shared/constants'

/**
 * TODO: callToCodeEfforts constants should be removed once the API to
 * get the efforts are implemented
 */
class LandingC extends Component {
  constructor (props) {
    super(props)
    this.getLinkStyles = this.getLinkStyles.bind(this)
  }

  getLinkStyles (itemType) {
    return itemType === 'number'
      ? `${styles.number} ${styles.effortItem}`
      : `${styles.label} ${styles.effortItem}`
  }

  renderList (items, type) {
    return items.map((item, index) => {
      return (
        <div key={index} className={this.getLinkStyles(type)}>
          {item}
        </div>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.landingPageHeading}>
          {'A truly international effort'}
        </h1>
        <div className={styles.map}>
          <img src={map} alt="Call to code presence international" />
        </div>
        <div className={styles.effortsSection}>
          { this.renderList(Object.values(callToCodeEfforts), 'number') }
          { this.renderList(Object.keys(callToCodeEfforts), 'label') }
        </div>
      </div>
    )
  }
}

export default LandingC
