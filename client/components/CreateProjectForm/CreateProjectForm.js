import React, { Component } from 'react'
import UploadDropzone from '../UploadDropzone/UploadDropzone'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import styles from './CreateProjectForm.scss'
import projectsApiClient from '../../api/projects'

class CreateProjectForm extends Component {
  renderImageUpload (field) {
    return (
      <UploadDropzone className={styles.inputImageUpload}
        saveFile={file => field.input.onChange(file)}
        {...field.input} />
    )
  }

  renderProjectName (field) {
    return (
      <input className={styles.inputProjectName}
        placeholder="Project Name"
        title = {field.meta.error}
        {...field.input} />
    )
  }

  async createProject (values) {
    const {projectname} = values
    const response = await projectsApiClient.createProject(projectname, this.props.user.organization)
    if (response.status === 500) {
      throw new SubmissionError({ projectname, _error: response.statusText })
    }
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form id="createProjectForm" className={styles.form} onSubmit={handleSubmit(this.createProject.bind(this))}>
        <h1 className={styles.formHeading}>Create New Project</h1>

        <Field name="image"
          component={this.renderImageUpload} />

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

function mapStateToProps (state) {
  return {
    projects: state.project.projects,
    user: state.user
  }
}

CreateProjectForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  createProject: PropTypes.func,
  user: PropTypes.object
}

const CreateProjectFormRedux = reduxForm({
  form: 'CreateProjectForm',
  onSubmitSuccess: (result, dispatch, props) => {
    props.history.push('/')
  }
})(CreateProjectForm)

export default connect(mapStateToProps, null)(CreateProjectFormRedux)
