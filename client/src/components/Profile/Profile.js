import React from 'react'
import ListOfProjects from '../ListOfProjects/ListOfProjects'
import projects from '../../data/profile-projects.json'

function Profile () {
  return (
    <ListOfProjects projects={projects} />
  )
}

export default Profile
