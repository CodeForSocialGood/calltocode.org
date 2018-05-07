import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserActionCreator from '../../actions/user'
import ApplicationActionCreator from '../../actions/application'
import Project from '../Project/Project'
import styles from './ListOfProjects.scss'

class ListOfProjects extends Component {
  constructor (props) {
    super(props)

    this.renderListOfProjects = this.renderListOfProjects.bind(this)
    this.applyToProject = this.applyToProject.bind(this)
  }

  applyToProject (project, user) {
    this.props.applyForProject(project, user)
    this.props.createApplication(project, user)
  }

  renderListOfProjects () {
    return this.props.projects.map((project, projectIndex) => {
      return (
        <div className={styles.projectTile} key={projectIndex}>
          <Project
            project={project}
            authenticated={this.props.authenticated}
            applyForProject={this.applyToProject}
          />
        </div>
      )
    })
  }

  render () {
    return (
      <section className={`${styles.projectListSection} project-list-section`}>
        <div className={styles.listContainer}>
          <div className={styles.list}>{this.renderListOfProjects()}</div>
        </div>
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
  applyForProject: UserActionCreator.applyForProject,
  createApplication: ApplicationActionCreator.createApplication
}

ListOfProjects.propTypes = {
  applyForProject: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  title: PropTypes.string,
  createApplication: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfProjects)
