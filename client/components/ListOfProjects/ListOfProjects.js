import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserActionCreator from '../../actions/user'
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
          authenticated={this.props.authenticated}
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
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = {
  applyForProject: UserActionCreator.applyForProject
}

ListOfProjects.propTypes = {
  applyForProject: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  title: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfProjects)
