import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'

import ProjectActionCreator from '../../actions/project'
import styles from './Home.scss'

import LandingA from '../LandingA/LandingA'
import LandingB from '../LandingB/LandingB'
import LandingC from '../LandingC/LandingC'
import LandingD from '../LandingD/LandingD'
import LandingE from '../LandingE/LandingE'
import LandingF from '../LandingF/LandingF'

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
      <div style={{'width': '100%'}}>
        <LandingA/>
        <div style={{'marginTop': '100vh', 'width': '100%'}}>
          <LandingB/>
          <LandingC/>
          <LandingD/>
        </div>
        <div style={{'position': 'absolute', 'left': 0, 'right': 0}}>
          <LandingE/>
          <LandingF/>
        </div>
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
