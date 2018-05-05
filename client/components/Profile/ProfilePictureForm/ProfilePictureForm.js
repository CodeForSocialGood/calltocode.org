import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button/Button'

import VerticalAlignHelper from '../../shared/VerticalAlignHelper/VerticalAlignHelper'
import UploadDropzone from '../../UploadDropzone/UploadDropzone'
import styles from './ProfilePictureForm.scss'

class ProfilePictureForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showForm: false
    }
  }

  saveFile () {
    // TODO ... implement the save file
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
      <UploadDropzone
        className={styles.inputImageUpload}
        saveFile={this.saveFile.bind(this)}
      />
    )
  }

  renderForm () {
    return (
      <form
        id="uploadProfilePictureForm"
        className={styles.form}
        onSubmit={this.uploadImage.bind(this)}>
        {this.renderImageUpload()}

        <Button
          className={styles.buttonSubmit}
          type="submit"
          color="primary"
          fullWidth>
          Save
        </Button>
      </form>
    )
  }

  renderProfilePicture () {
    const { user } = this.props
    return (
      <div
        className={styles.profilePicture}
        onClick={() => this.setState({ showForm: true })}>
        <div className={styles.profilePictureInner}>
          <img
            className={styles.image}
            src={
              user.profilePicture ||
              require('../../../images/profile-image.jpg')
            }
          />

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
      <div className={styles.profilePictureWrapper}>
        <h3 className={styles.formHeading}>You</h3>
        {render}
      </div>
    )
  }
}

ProfilePictureForm.propTypes = {
  user: PropTypes.object
}

export default ProfilePictureForm
