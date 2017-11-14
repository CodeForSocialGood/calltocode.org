import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ListOfProjects.scss'
import defaultProjects from '../../data/projects.json'
import emailApiClient from '../../api/email'
import { connect } from 'react-redux'

class ListOfProjects extends Component {
  constructor (props) {
    super(props);

    this.renderListOfProjects = this.renderListOfProjects.bind(this);
    this.projects = this.props.projects || defaultProjects;
    this.renderProjectApplicationResult = this.renderProjectApplicationResult.bind(this);
  }

  renderListOfProjects () {
    const liClassName = this.props.loggedIn ? styles.listOrgLoggedIn : styles.listOrg
    const {projects, dispatch} = this.props;

    return this.projects.map((project, index) => {
      return (
        <li
          key={index}
          className={liClassName}
          onClick={this.props.loggedIn ? mailToOrganization(projects, dispatch) : null}>
          {this.renderProjectApplicationResult(project)}
          Name:{project.name} Role:{project.role}
        </li>
      )
    })
  }

  renderProjectApplicationResult(project) {
    if (true === project.applicationResult) {
      return (
        <div>
          &#10006;
        </div>
      )
    }else if(false === project.applicationResult) {
      return (
        <div>
          &#10007;
        </div>
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
  return { loggedIn: state.login.loggedIn }
}

ListOfProjects.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  projects: PropTypes.array
}

export default connect(mapStateToProps)(ListOfProjects)
