import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'

import VerticalAlignHelper from '../../shared/VerticalAlignHelper/VerticalAlignHelper'
import UploadDropzone from '../../UploadDropzone/UploadDropzone'
import styles from './ProfilePictureForm.scss'

class ProfilePictureForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false
    }
  }

  uploadImage (values) {
    console.log(values)
    /*
    waiting for story #154115334 for uploading image to server
     */

    /* if (success uploading image, it will be saved as user.profilePicture) */
    this.setState({ showForm: false })
  }

  renderImageUpload (field) {
    return (
      <UploadDropzone className={styles.inputImageUpload}
        saveFile={file => field.input.onChange(file)}
        {...field.input} />
    )
  }

  renderForm () {
    const { handleSubmit } = this.props
    return (
      <form id="uploadProfilePictureForm" className={styles.form} onSubmit={handleSubmit(this.uploadImage.bind(this))}>

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

  renderProfilePicture () {
    const { user } = this.props
    return (
      <div
        className={styles.profilePicture}
        onClick={() => this.setState({ showForm: true })} >

        <div className={styles.profilePictureInner} >

          <img className={styles.image} src={user.profilePicture || require('../../../images/profile-image.jpg')} />

          <div className={styles.imageHoverCover} />

          <div className={styles.uploadNewButton}>
            <VerticalAlignHelper />
            <button>Upload New</button>
          </div>

        </div>

      </div>
    )
  }

  render () {
    const render = this.state.showForm
      ? this.renderForm()
      : this.renderProfilePicture()

    return (
      <div className={styles.profilePictureWrapper} >
        <h1 className={styles.formHeading} >Profile Picture</h1>
        {render}
      </div>
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
