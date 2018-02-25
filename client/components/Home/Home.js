import React, { Component, Fragment } from 'react'
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
      }
    }
  }

  componentDidMount () {
    this.props.onLoad()
  }

  handleCheckbox (event, checked) {
    const filters = this.state.filters
    const index = this.state.filters[event.target.name].indexOf(event.target.value)
    if (index === -1) {
      filters[event.target.name].push(event.target.value)
      this.setState({ filters })
    } else {
      filters[event.target.name].splice(index, 1)
      this.setState({ filters })
    }
  }

  renderList (items, type) {
    return items.map((item, index) => {
      return (
        <FormControlLabel key={index}
          control={ <Checkbox name={type} value={item} onChange={this.handleCheckbox} /> }
          label={item}
        />
      )
    })
  }

  render () {
    const filteredProjects = this.props.projects.filter(project => {
      let matched = true
      this.state.filters.causes.forEach(cause => {
        if (!project.causes.includes(cause)) {
          matched = false
        }
      })
      this.state.filters.technologies.forEach(technology => {
        if (!project.technologies.includes(technology)) {
          matched = false
        }
      })
      return matched
    })

    return (
      <Fragment>
        <section className={styles.filterSection}>
          <h1>{'Filters'}</h1>
          <FormLabel>Causes</FormLabel>
          <FormGroup row>
            { this.renderList(causes, 'causes') }
          </FormGroup>

          <FormLabel>Technologies</FormLabel>
          <FormGroup row>
            { this.renderList(technologies, 'technologies') }
          </FormGroup>
        </section>

        <ListOfProjects
          title={'Click To Apply'}
          projects={filteredProjects} />
      </Fragment>
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
