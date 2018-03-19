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
      filters: {
        causes: [],
        technologies: []
      },
      filteredProjects: props.projects
    }
  }

  componentDidMount () {
    this.props.onLoad()
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.projects !== nextProps.projects) {
      this.setState({filteredProjects: nextProps.projects})
    }
  }

  projectContainsCause (project) {
    return this.state.filters.causes.length === 0 || this.state.filters.causes.some(cause => project.causes.indexOf(cause) >= 0)
  }
  projectContainsTech (project) {
    return this.state.filters.technologies.length === 0 || this.state.filters.technologies.some(tech => project.technologies.indexOf(tech) >= 0)
  }

  handleCheckbox (event, checked) {
    const filters = this.state.filters
    const index = this.state.filters[event.target.name].indexOf(event.target.value)
    if (index === -1) {
      filters[event.target.name].push(event.target.value)
    } else {
      filters[event.target.name].splice(index, 1)
    }
    this.setState({ filters })
    const filteredProjects = this.props.projects.filter(project => {
      return this.projectContainsCause(project) && this.projectContainsTech(project)
    })
    this.setState({ filteredProjects })
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
          <FormGroup className={styles.causesList}>
            { this.renderList(causes, 'causes') }
          </FormGroup>
          <FormLabel className={styles.techTitle}>Tech</FormLabel>
          <FormGroup className={styles.techList}>
            { this.renderList(technologies, 'technologies') }
          </FormGroup>
        </section>

        <ListOfProjects
          title={'Find Projects'}
          projects={this.state.filteredProjects}
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
