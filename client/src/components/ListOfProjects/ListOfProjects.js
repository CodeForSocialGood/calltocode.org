import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styles from './ListOfProjects.scss'
import emailApiClient from '../../api/email'
import {connect} from 'react-redux'


class ListOfProjects extends Component {
  constructor(props) {
    super(props);

    this.renderListOfProjects = this.renderListOfProjects.bind(this)
    this.renderProject = this.renderProject.bind(this);
  }

  renderListOfProjects() {
    const liClassName = this.props.loggedIn ? styles.listOrgLoggedIn : styles.listOrg;
    var {projects, dispatch} = this.props;

    return projects.map((project, index) => {
      return (
        <li
          key={index}
          className={liClassName}
          onClick={this.props.loggedIn ? mailToOrganization(project, dispatch) : null}>
          Name:{project.name} Role:{project.role} {this.renderProject(project)}
        </li>
      )
    })
  }


  renderProject(project) {
    if (true === project.applicationStatus) {
      return (
        <span className={styles.projectApplicationPassed}>
          &#10004;
        </span>
      )
    } else if (false === project.applicationStatus) {
      return (
        <span className={styles.projectApplicationFailed}>
          &#10007;
        </span>
      )
    } else {
      return null;
    }
  }

  render() {
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



function mailToOrganization(project, dispatch) {
  return () => {
    const {email, name, role} = project;
    const projectInfo = {email, name, role};

    emailApiClient.send(projectInfo).then(function(){
      dispatch({
        type:"ApplyProject"
      })
    })
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.login.loggedIn,
    projects: state.projects
  }
}

ListOfProjects.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ListOfProjects)
