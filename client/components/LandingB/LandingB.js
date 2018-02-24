import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import styles from './LandingB.scss'
import volun from '../../images/volunteers.png'
import orgzs from '../../images/organizations.png'

class LandingB extends Component {
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
          {'Global network for social good'}
        </h1>
        <div>
          <table><tbody>
            <tr>
              <td><div className={styles.imgContainer1}><div className={styles.centeredText1}><h4>VOLUNTEERS</h4></div><img className={styles.mainimage1} src={volun} alt="Volunteers" /></div></td>
              <td><div className={styles.imgContainer2}><div className={styles.centeredText2}><h4>ORGANIZATIONS</h4></div><img className={styles.mainimage1} src={orgzs} alt="Organizations" /></div></td>
            </tr></tbody>
          </table>
      </div>
      </div>
    )
  }
}


export default LandingB
