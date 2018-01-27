import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProjectActionCreator from '../../actions/project'
import ProfilePictureForm from './ProfilePictureForm/ProfilePictureForm'
import ListOfProjects from '../ListOfProjects/ListOfProjects'
import styles from './Profile.scss'

class Profile extends Component {
  componentDidMount () {
    this.props.onLoad(this.props.user)
  }

  render () {
    const title = this.props.user.usertype === 'contact'
      ? 'Your Organization\'s Projects'
      : 'Projects Applied For'

    return (
      <div className={styles.profilePage}>

        <div className={styles.profilePictureForm} >
          <ProfilePictureForm user={this.props.user} />
        </div>

        <div className={styles.listOfProjects} >
          <ListOfProjects
            title={title}
            projects={this.props.projects} />
        </div>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects,
    user: state.user
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchProfileProjects
}

Profile.propTypes = {
  onLoad: PropTypes.func,
  projects: PropTypes.array,
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
