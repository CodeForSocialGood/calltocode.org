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
      showForm: false
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
  }

  handleClick(event) {
    this.setState({ showForm: true })
  }

  saveFile (file) {
    this.uploadImage(file)
  }

  async uploadImage (file) {
    await this.props.updateProfilePicture(file)

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
        onClick={this.handleClick.bind(this)}>
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
      </div>
    )
  }
}

ProfilePictureForm.propTypes = {
  user: PropTypes.object,
  updateProfilePicture: PropTypes.func.isRequired
}

export default ProfilePictureForm
