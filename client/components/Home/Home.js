import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import { FormGroup, FormLabel, FormControlLabel } from 'material-ui/Form'

import ProjectActionCreator from '../../actions/project'
import ListOfProjects from '../ListOfProjects/ListOfProjects'
import styles from './Home.scss'
import { causes, technologies } from '../shared/constants'

class Home extends Component {
  constructor (props) {
    super(props)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.renderList = this.renderList.bind(this)
    this.state = {
      filters: {}
    }
  }

  componentDidMount () {
    this.props.onLoad()
  }

  handleCheckbox (event, checked) {
    console.log(event.target.name, event.target.value, checked)
  }

  renderList (items, type) {
    return items.map((item, index) => {
      return (
        <FormControlLabel key={index}
          control={ <Checkbox name={type} value={item} onChange={this.handleCheckbox} /> }
          label={item}
          className={styles.checkBoxes}
        />
      )
    })
  }

  render () {
    return (
      <div className={styles.homeGrid}>
        <section className={styles.filterSection}>
          <span className={styles.filterTitle}><h1>{'Filters'}</h1></span>
          <FormLabel className={styles.causeTitle}>Causes</FormLabel>
          <FormGroup column className={styles.causesList}>
            { this.renderList(causes, 'causes') }
          </FormGroup>
          <FormLabel className={styles.techTitle}>Tech</FormLabel>
          <FormGroup column className={styles.techList}>
            { this.renderList(technologies, 'technologies') }
          </FormGroup>
        </section>

        <ListOfProjects
          title={'Click To Apply'}
          projects={this.props.projects}
          className={styles.projectList}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchAllProjects

}

Home.propTypes = {
  onLoad: PropTypes.func,
  projects: PropTypes.array

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
