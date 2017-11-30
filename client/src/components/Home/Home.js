import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { populateOpps } from '../../actions'
import ListOfProjects from '../ListOfProjects/ListOfProjects'

class Home extends Component {
  componentDidMount () {
    if (this.props.projects.length === 0) {
      this.props.populateOpps()
    }
  }

  render () {
    return (
      <ListOfProjects
        title={'Click To Apply'}
        projects={this.props.projects} />
    )
  }
}

function mapStateToProps (state) {
  return {
    projects: state.projects
  }
}

Home.propTypes = {
  projects: PropTypes.array,
  populateOpps: PropTypes.func
}

export default connect(mapStateToProps, { populateOpps })(Home)
