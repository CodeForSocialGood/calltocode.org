import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ListOfProjects.scss'
import emailApiClient from '../../api/email'
import { connect } from 'react-redux'

class ListOfProjects extends Component {
  constructor (props) {
    super(props);

    this.renderListOfProjects = this.renderListOfProjects.bind(this);
    this.projects = this.props.projects;
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this);
  }

  renderListOfProjects () {
    const {projects, dispatch} = this.props;

    return projects.map((project, index) => {
      const applied = project.applicationResult === true || project.applicationResult === false;
      const liClassName = this.props.loggedIn && !applied ? styles.listOrgLoggedIn : styles.listOrg;

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
        <h1 className={styles.title}>Apply Below</h1>
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
  dispatch: PropTypes.func
}

export default connect(mapStateToProps)(ListOfProjects)
