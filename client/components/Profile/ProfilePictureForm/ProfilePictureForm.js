import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'

import UploadDropzone from '../../UploadDropzone/UploadDropzone'
import styles from './ProfilePictureForm.scss'

class ProfilePictureForm extends Component {
  uploadImage (values) {
    console.log(values)
    /*
    waiting for story #154115334 for uploading image to server
     */
  }

  renderImageUpload (field) {
    return (
      <UploadDropzone className={styles.inputImageUpload}
        saveFile={file => field.input.onChange(file)}
        {...field.input} />
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <form id="uploadProfilePictureForm" className={styles.form} onSubmit={handleSubmit(this.uploadImage.bind(this))}>
        <h1 className={styles.formHeading} >Upload Profile Picture</h1>

        <Field name="image"
          component={this.renderImageUpload} />

        <button
          className={styles.buttonSubmit}
          type="submit">
          Save
        </button>
      </form>
    )
  }
}

ProfilePictureForm.propTypes = {
  user: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func
}

const ProfilePictureFormRedux = reduxForm({ form: 'ProfilePictureForm' })(ProfilePictureForm)

export default connect(null, null)(ProfilePictureFormRedux)
