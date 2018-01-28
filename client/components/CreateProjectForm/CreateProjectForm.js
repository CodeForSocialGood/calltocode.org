import React, { Component } from 'react'
import UploadDropzone from '../UploadDropzone/UploadDropzone'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './CreateProjectForm.scss'
import projectsApiClient from '../../api/projects'

import { buttonSubmit } from './createProjectFormJss'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField/TextField'
import Button from 'material-ui/Button/Button'

class CreateProjectForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.createProject = this.createProject.bind(this)
    this.saveFile = this.saveFile.bind(this)
    this.projectNameChange = this.projectNameChange.bind(this)
    this.state = {
      error: '',
      projectName: ''
    }
  }
  saveFile () {
    // TODO ... implement the save file
  }

  projectNameChange (event) {
    event.preventDefault()
    this.setState({projectName: event.target.value})
  }

  async createProject (values) {
    const {projectname} = values
    const response = await projectsApiClient.createProject(projectname, this.props.user.organization)
    if (response.status === 500) {
      this.setState({error: response.statusText})
    }
  }

  render () {
    const {classes} = this.props
    return (
      <form id="createProjectForm" className={styles.form} onSubmit={this.createProject}>
        <h1 className={styles.formHeading}>Create New Project</h1>

        <UploadDropzone className={styles.inputImageUpload}
          saveFile={() => {}}/>

        <TextField className={styles.inputProjectName}
          required id="projectname"
          label="Project name" onChange={this.projectNameChange}
          type="text" fullWidth name="projectname"/>

        <Button type="submit" disabled={this.state.projectName.length === 0} raised className={classes.root} color="primary" fullWidth>
        Create Project
        </Button>

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
  user: PropTypes.object,
  classes: PropTypes.object
}

export default connect(mapStateToProps, null)(withStyles(buttonSubmit)(CreateProjectForm))
