import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultProfileImage from '../../../images/profile-image.jpg'
import VerticalAlignHelper from '../../shared/VerticalAlignHelper/VerticalAlignHelper'
import UploadDropzone from '../../UploadDropzone/UploadDropzone'
import styles from './ProfilePictureForm.scss'

class ProfilePictureForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showForm: false,
      showConfirmation: false
    }
  }

  handleFormSubmit (event) {
    event.preventDefault()
  }

  handleUploadClick (event) {
    this.setState({ showForm: true, showConfirmation: false })
  }

  saveFile (file) {
    this.file = file
    this.setState({ showConfirmation: true })
  }

  async handleConfirmationClick (event) {
    event.preventDefault()
    await this.uploadImage(this.file)
    this.setState({ showForm: false, showConfirmation: false })
  }

  async uploadImage (file) {
    if (!file) {
      return this.setState({ showForm: true, showConfirmation: false })
    }
    await this.props.updateProfilePicture(file)
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
        onSubmit={this.handleFormSubmit.bind(this)} >
        {this.renderImageUpload()}
      </form>
    )
  }

  renderProfilePicture () {
    const { user } = this.props
    return (
      <div
        className={styles.profilePicture}
        onClick={this.handleUploadClick.bind(this)}>
        <div className={styles.profilePictureInner}>
          <img
            className={styles.image}
            src={
              user.profilePicture || defaultProfileImage
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
        {this.state.showConfirmation && (
          <button
            className={styles.confirmation}
            onClick={this.handleConfirmationClick.bind(this)}>
            Confirm
          </button>
        )}
      </div>
    )
  }
}

ProfilePictureForm.propTypes = {
  user: PropTypes.object,
  updateProfilePicture: PropTypes.func.isRequired
}

export default ProfilePictureForm
