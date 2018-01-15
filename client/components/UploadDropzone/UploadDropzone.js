import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import CloudUpload from 'material-ui-icons/CloudUpload'
import Snackbar from 'material-ui/Snackbar'

import styles from './UploadDropzone.scss'

const imageTypes = ['image/jpeg', 'image/png', 'image/bmp']

class UploadDropzone extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: this.props.file || null,
      sizeLimit: this.props.sizeLimit || 3000000,
      types: this.props.types || imageTypes,
      error: false,
      errorMessage: ''
    }
  }
  onDropAccepted (files) {
    const [file] = files

    this.setState({ file })
    this.props.saveFile(file)
  }
  onDropRejected (files) {
    const [file] = files
    const { size, type } = file
    const { sizeLimit, types } = this.state

    let message = 'Something went wrong, please try again'

    if (!types.includes(type)) {
      message = `File type is invalid, supported type are ${types.join(', ')}`
    } else if (size > sizeLimit) {
      message = `File is too big, max size is ${sizeLimit / 1000000}MB`
    }

    this.setState({
      error: true,
      errorMessage: message
    })
  }
  render () {
    const { file, sizeLimit, types, error, errorMessage } = this.state

    return (
      <div>
        <Dropzone className={styles.dropzone}
          acceptClassName={styles.accept}
          rejectClassName={styles.reject}
          accept={types.join(',')}
          maxSize={sizeLimit}
          onDropAccepted={this.onDropAccepted.bind(this)}
          onDropRejected={this.onDropRejected.bind(this)}>
          { file &&
            <img className={styles.image} src={file.preview || file.path} alt="Image Preview" />
          }
          { !file &&
            <div className={styles.dropzoneInterior}>
              <CloudUpload className={styles.uploadIcon} />
              <p className={styles.uploadText}>
                Drag and drop an image file here, or click
              </p>
            </div>
          }
        </Dropzone>

        <Snackbar className={styles.snackbar}
          open={error}
          message={errorMessage}
          autoHideDuration={5000} />
      </div>
    )
  }
}

UploadDropzone.propTypes = {
  saveFile: PropTypes.func.isRequired,
  file: PropTypes.object,
  sizeLimit: PropTypes.number,
  types: PropTypes.array
}

export default UploadDropzone
