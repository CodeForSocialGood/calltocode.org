import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ApplicationActionCreator from '../../actions/application/'

class ApplicationsList extends Component {
  componentWillReceiveProps (nextProps) {
    this._markAsSeenApplications(nextProps.applications)
  }

  componentDidMount () {
    this._markAsSeenApplications(this.props.applications)
  }

  _markAsSeenApplications (applications) {
    if (Array.isArray(applications)) {
      applications.map(application => {
        this.props.markAsSeen(application.id)
      })
    }
  }
  renderApplicationInfo (application) {
    return (<div> Volunteer email: {application.volunteer.email} - Project name: {application.project.name} </div>)
  }
  render () {
    return (
      Array.isArray(this.props.applications) && this.props.applications.map(this.renderApplicationInfo)
    )
  }
}

const mapStateToProps = (state) => ({
  applications: state.application.applications
})

const mapDispatchToProps = {
  markAsSeen: ApplicationActionCreator.markAsSeen
}

ApplicationsList.propTypes = {
  applications: PropTypes.any,
  markAsSeen: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsList)
