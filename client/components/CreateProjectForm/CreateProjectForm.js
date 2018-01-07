import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm , SubmissionError} from 'redux-form'
import PropTypes from 'prop-types'
import styles from './CreateProjectForm.scss'
import {withRouter} from 'react-router'

import ProjectActionCreator from '../../actions/project'
import projectsApiClient from '../../api/projects'

class CreateProjectForm extends Component {
  renderProjectName (field) {
    return (
      <input className={styles.inputProjectName}
        placeholder="Project Name"
        title = {field.meta.error}
        {...field.input} />
    )
  }

  async createProject(values){
    const {projectname}=values
    const response= await projectsApiClient.createProject(projectname)
    if(response.status===500){
      throw new SubmissionError({ projectname, _error: response.statusText })
    }
  }

  render () {
    const { error, handleSubmit } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit(this.createProject.bind(this))}>
        <h1 className={styles.title}>Create New Project</h1>

        <Field
          name="projectname"
          component={this.renderProjectName} />

        <button className={styles.buttonSubmit} type="submit">
          Create Project
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  createProject: ProjectActionCreator.createProject
}

CreateProjectForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  createProject: PropTypes.func
}


const CreateProjectFormRedux = reduxForm({
  form: 'CreateProjectForm',
  onSubmitSuccess: (result, dispatch, props) => {
    props.history.push('/')
  }
})(CreateProjectForm)

export default connect(null, mapDispatchToProps)(CreateProjectFormRedux)
