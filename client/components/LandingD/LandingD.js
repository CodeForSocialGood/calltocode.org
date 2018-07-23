import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import styles from './LandingD.scss'
import { connect } from 'react-redux'
import ProjectActionCreator from '../../actions/project'

class LandingD extends Component {
  constructor (props) {
    super(props)
    this.renderProject = this.renderProject.bind(this)
  }
  componentDidMount () {
    this.props.loadRecentProjects(3)
  }
  renderProject (project) {
    const { id, name, imageUrl } = project
    return (
      <div key={id} className={styles.column}>
        <img src={imageUrl}
          alt="project 1" className={styles.project1}/>
        <h6 className={styles.projectTitle}>{name}</h6>
        <p className={styles.projectDetails}>
          {name}
        </p>
        <Button to={`/projects/${id}`} component={Link} className={styles.learnMore}>
              Learn More
        </Button>
      </div>)
  }
  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>
          Changing the world, one project at a time
        </h1>

        <div className={styles.subcontainer}>
          {this.props.recentProjects.projects &&
            this.props.recentProjects.projects.map(this.renderProject)}
        </div>

        <div className={styles.viewAllContainer}>
          <Button to="/" component={Link} className={styles.viewAll}>
            VIEW ALL
          </Button>
        </div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    recentProjects: state.project.recentProjects
  }
}

const mapDispatchToProps = {
  loadRecentProjects: ProjectActionCreator.getRecentProjects
}
LandingD.propTypes = {
  loadRecentProjects: PropTypes.func.isRequired,
  recentProjects: PropTypes.shape({
    isLoading: PropTypes.bool,
    projects: PropTypes.array,
    error: PropTypes.object
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingD)
