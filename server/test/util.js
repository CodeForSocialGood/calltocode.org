import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import app from '../app'
import Project from '../database/models/Project'
import User from '../database/models/User'
import seedProjects from '../../.setup/db/seedData/projects.json'
import seedUsers from '../../.setup/db/seedData/users.json'

const mongod = new MongodbMemoryServer()

export async function before (t) {
  const mongoUri = await mongod.getConnectionString()
  mongoose.Promise = global.Promise
  mongoose.connect(mongoUri)
}

export async function beforeEach (t) {
  const projects = seedProjects.map(formatData)
  await saveData(projects, Project)
  t.context.projects = projects

  const users = seedUsers.map(formatData)
  await saveData(users, User)
  t.context.users = users

  t.context.app = app
}

export async function afterEach (t) {
  await Project.remove()
  await User.remove()
}

export async function after (t) {
  mongoose.disconnect()
  mongod.stop()
}

function formatData (data) {
  const newData = { ...data }
  const oid = '$oid'
  const date = '$date'

  for (const prop in newData) {
    // Format ObjectId
    if (newData[prop][oid]) newData[prop] = newData[prop][oid]
    // Format ISODate
    if (newData[prop][date]) newData[prop] = newData[prop][date]
  }

  return newData
}

async function saveData (dataArr, Model) {
  for (const data of dataArr) {
    const entity = new Model(data)
    await entity.save()
  }
}
