import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import app from '../app'
import Application from '../database/models/Application'
import Project from '../database/models/Project'
import User from '../database/models/User'
import seedApplications from '../../.setup/db/seedData/applications.json'
import seedProjects from '../../.setup/db/seedData/projects.json'
import seedUsers from '../../.setup/db/seedData/users.json'

const mongod = new MongodbMemoryServer()
const generateSessionToken = User.schema.methods.generateSessionToken

export async function before (t) {
  const mongoUri = await mongod.getConnectionString()
  mongoose.Promise = global.Promise
  mongoose.connect(mongoUri)
}

export async function beforeEach (t) {
  const applications = seedApplications.map(formatData)
  await saveData(applications, Application)
  t.context.applications = applications

  const projects = seedProjects.map(formatData)
  await saveData(projects, Project)
  t.context.projects = projects

  const users = seedUsers.map(formatData)
  await saveData(users, User)
  t.context.users = users

  const contact = users.find(user => user.usertype === 'contact')
  t.context.contact = contact
  t.context.contactToken = generateSessionToken.call(contact)

  const volunteer = users.find(user => user.usertype === 'volunteer')
  t.context.volunteer = volunteer
  t.context.volunteerToken = generateSessionToken.call(volunteer)

  t.context.app = app
}

export async function afterEach (t) {
  await Application.remove()
  await Project.remove()
  await User.remove()
}

export async function after (t) {
  mongoose.disconnect()
  mongod.stop()
}

function formatData (data) {
  const copy = {}

  for (const prop in data) {
    let val = data[prop]

    if (Array.isArray(val)) {
      for (const index in val) val[index] = formatValue(val[index])
    } else if (typeof val === 'object') {
      val = formatValue(val)
    }

    copy[prop] = val
  }

  return copy
}

function formatValue (value) {
  const oid = '$oid'
  const date = '$date'

  // Format ObjectId
  if (value[oid]) return value[oid]
  // Format ISODate
  if (value[date]) return value[date]

  return value
}

async function saveData (dataArr, Model) {
  for (const data of dataArr) {
    const entity = new Model(data)
    await entity.save()
  }
}
