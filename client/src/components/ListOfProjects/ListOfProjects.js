import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ListOfProjects.scss'
import emailApiClient from '../../api/email'
import { connect } from 'react-redux'

class ListOfProjects extends Component {
  constructor (props) {
    super(props);

<<<<<<< HEAD
    this.renderListOfProjects = this.renderListOfProjects.bind(this)
    this.projects = this.props.projects || defaultProjects
    this.title = this.props.title || 'Apply Below'
=======
    this.renderListOfProjects = this.renderListOfProjects.bind(this);
    this.projects = this.props.projects;
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this);
>>>>>>> hhy_project
  }

  renderListOfProjects () {
    const {projects, dispatch} = this.props;

    return projects.map((project, index) => {
      const applied = project.applicationResult === true || project.applicationResult === false;
      const liClassName = this.props.loggedIn && !applied ? styles.listOrgLoggedIn : styles.listOrg;

<<<<<<< HEAD
    return this.projects.map((project, index) => {
      if (project.name && project.role) {
        return (
          <li
            key={index}
            className={liClassName}
            onClick={this.props.loggedIn ? mailToOrganization(project) : null}>
            Name:{project.name} Role:{project.role}
          </li>
        )
      }
=======
      return (
        <li
          key={index}
          onClick={this.props.loggedIn && ! applied ? mailToOrganization(project, dispatch) : null}>
          {this.renderProjectApplicationResult(project)}
          <div className={liClassName}>
            Name:{project.name} Role:{project.role}
          </div>
        </li>
      )
>>>>>>> hhy_project
    })
  }

  renderProjectApplicationResult(project) {
    if (true === project.applicationResult) {
      return (
        <span className={styles.listApplyPass}>
          &#10004;
        </span>
      )
    }else if(false === project.applicationResult) {
      return (
        <span className={styles.listApplyFail}>
          &#10007;
        </span>
      )
    }else
      return null
  }

  render () {
    return (
      <section className={styles.orgSection}>
        <h1 className={styles.title}>{this.title}</h1>
        <ul>
          {this.renderListOfProjects()}
        </ul>
      </section>
    )
  }
}

function mailToOrganization (project, dispatch) {
  return () => {
    const {email, name, role} = project
    const projectInfo = {email, name, role}

    emailApiClient.send(projectInfo).then(function() {
      dispatch ({
        type: 'ApplyProject',
        id: project.id,
        result: true
      })
    })
  }
}

function mapStateToProps (state) {
  return {
    loggedIn: state.login.loggedIn,
    projects: state.projects
  }
}

ListOfProjects.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array,
<<<<<<< HEAD
  title: PropTypes.string
=======
  dispatch: PropTypes.func
>>>>>>> hhy_project
}

export default connect(mapStateToProps)(ListOfProjects)
