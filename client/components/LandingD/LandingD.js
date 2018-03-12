import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'

import ListOfProjects from '../ListOfProjects/ListOfProjects'
import ProjectActionCreator from '../../actions/project'
import styles from './LandingD.scss'

class LandingD extends Component {
  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          Changing the world, one project at a time
        </h1>
        <div className={styles.projectSection}>
          <ListOfProjects
            projects={this.props.projects} />
        </div>
        <div className={styles.viewAllContainer}>
          <Button to="/" component={Link} className={styles.viewAll}>
            VIEW ALL
          </Button>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.onLoad()
  }
}

function mapStateToProps (state) {
  return {
    projects: state.project.projects
  }
}

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchRecentProjects
}

LandingD.propTypes = {
  onLoad: PropTypes.func,
  projects: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingD)
