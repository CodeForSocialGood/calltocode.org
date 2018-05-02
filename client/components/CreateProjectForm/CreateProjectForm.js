import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField/TextField'
import Button from 'material-ui/Button/Button'
import Checkbox from 'material-ui/Checkbox'
import { FormGroup, FormLabel, FormControlLabel } from 'material-ui/Form'

import UploadDropzone from '../UploadDropzone/UploadDropzone'
import styles from './CreateProjectForm.scss'
import { buttonSubmit } from './createProjectFormJss'
import { causes, technologies } from '../shared/constants'

import ProjectActionCreator from '../../actions/project/'

class CreateProjectForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.createProject = this.createProject.bind(this)
    this.saveFile = this.saveFile.bind(this)
    this.projectNameChange = this.projectNameChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.renderList = this.renderList.bind(this)
    this.state = {
      error: '',
      projectName: '',
      causes: [],
      technologies: [],
      file: ''
    }
  }

  saveFile (file) {
    this.setState({file})
  }

  projectNameChange (event) {
    event.preventDefault()
    this.setState({projectName: event.target.value})
  }

  async createProject (event) {
    event.preventDefault()
    this.props.createProject(this.state.projectName,
      this.state.causes,
      this.state.technologies,
      this.props.user.organization,
      this.state.file)
  }

  handleCheckbox (event, checked) {
    const value = event.target.value
    const listName = causes.includes(value) ? 'causes' : 'technologies'
    const list = this.state[listName]

    this.setState({
      [listName]: checked
        ? [...list, value]
        : list.filter(i => i !== value)
    })
  }

  renderList (items) {
    return items.map((item, index) => {
      return (
        <FormControlLabel key={index}
          control={ <Checkbox value={item} onChange={this.handleCheckbox} /> }
          label={item}
        />
      )
    })
  }

  render () {
    const {classes} = this.props
    return (
      <form id="createProjectForm" className={styles.form} onSubmit={this.createProject}>
        <h1 className={styles.formHeading}>Create New Project</h1>

        <UploadDropzone className={styles.inputImageUpload}
          saveFile={this.saveFile} />

        <TextField className={styles.inputProjectName}
          required id="projectname"
          label="Project name" onChange={this.projectNameChange}
          type="text" fullWidth name="projectname"/>

        <FormLabel>Causes</FormLabel>
        <FormGroup row>
          {this.renderList(causes)}
        </FormGroup>

        <FormLabel>Technologies</FormLabel>
        <FormGroup row>
          {this.renderList(technologies)}
        </FormGroup>

        <Button type="submit" disabled={this.state.projectName.length === 0} raised className={classes.root} color="primary" fullWidth>
        Create Project
        </Button>

        {this.props.errorMessage.length > 0 &&
          <div className={styles.errorContent}>
            {this.props.errorMessage}
          </div>
        }
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects,
    user: state.user,
    errorMessage: state.project.error.message
  }
}

const mapDispatchToProps = {
  createProject: ProjectActionCreator.createProject
}

CreateProjectForm.contextTypes = {
  router: PropTypes.object
}

CreateProjectForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  createProject: PropTypes.func,
  user: PropTypes.object,
  classes: PropTypes.object,
  projects: PropTypes.array,
  errorMessage: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(buttonSubmit)(CreateProjectForm))
