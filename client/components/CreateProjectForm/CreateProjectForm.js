import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import UploadDropzone from '../UploadDropzone/UploadDropzone'
import styles from './CreateProjectForm.scss'

class CreateProjectForm extends Component {
  renderImageUpload (field) {
    return (
      <UploadDropzone className={styles.inputImageUpload}
        saveFile={file => field.input.onChange(file)} />
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
  render () {
    return (
      <form className={styles.form}>
        <h1 className={styles.title}>Create New Project</h1>

        <Field name="image"
          component={this.renderImageUpload} />

        <Field name="project-name"
          component={this.renderProjectName} />

        <button className={styles.buttonSubmit} type="submit">
          Create Project
        </button>
      </form>
    )
  }
}

const CreateProjectFormRedux = reduxForm({
  form: 'CreateProjectForm',
  onSubmitSuccess: (result, dispatch) => {

  }
})(CreateProjectForm)

export default CreateProjectFormRedux
