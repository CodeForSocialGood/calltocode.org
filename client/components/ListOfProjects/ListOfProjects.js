import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GridList, { GridListTile } from 'material-ui/GridList'
import Chip from 'material-ui/Chip'

import UserActionCreator from '../../actions/user'
import Project from '../Project/Project'
import styles from './ListOfProjects.scss'

class ListOfProjects extends Component {
  constructor (props) {
    super(props)

    this.renderListOfProjects = this.renderListOfProjects.bind(this)
  }

  renderListOfProjects () {
    return this.props.projects.map((project, projectIndex) => {
      return (
        <GridListTile key={projectIndex}>
          <Project
            project={project}
            authenticated={this.props.authenticated}
            applyForProject={this.props.applyForProject} />

          <div className={styles.causesContainer}>
            { project.causes.map((cause, chipIndex) => {
              return (
                <Chip key={`${projectIndex}${chipIndex}`}
                  className={styles.cause}
                  label={cause} />
              )
            })}
          </div>
        </GridListTile>
      )
    })
  }

  render () {
    return (
      <section className={styles.projectListSection}>
        <h1>{this.props.title}</h1>

        <div className={styles.listContainer}>
          <GridList className={styles.list} cellHeight={'auto'} cols={3} spacing={8}>
            { this.renderListOfProjects() }
          </GridList>
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = {
  applyForProject: UserActionCreator.applyForProject
}

ListOfProjects.propTypes = {
  applyForProject: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
  projects: PropTypes.array,
  title: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfProjects)
