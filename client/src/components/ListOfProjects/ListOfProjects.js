import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { applyForProject } from '../../actions'
import Project from '../Project/Project'

import styles from './ListOfProjects.scss'

class ListOfProjects extends Component {
  constructor (props) {
    super(props)

    this.renderListOfProjects = this.renderListOfProjects.bind(this)
  }

  renderListOfProjects () {
    return this.props.projects.map((project, index) => {
      return (
        <Project
          key={index}
          project={project}
          loggedIn={this.props.loggedIn}
          applyForProject={this.props.applyForProject} />
      )
    })
  }

  render () {
    return (
      <section className={styles.orgSection}>
        <h1 className={styles.title}>{this.props.title}</h1>
        <ul>
          {this.renderListOfProjects()}
        </ul>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn
  }
}

ListOfProjects.propTypes = {
  title: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  applyForProject: PropTypes.func
}

export default connect(mapStateToProps, { applyForProject })(ListOfProjects)
