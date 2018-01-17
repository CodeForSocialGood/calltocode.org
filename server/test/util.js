const MongodbMemoryServer = require('mongodb-memory-server').default
const mongoose = require('mongoose')

const app = require('../app')
const Project = require('../database/models/Project')
const User = require('../database/models/User')
const seedProjects = require('../../.setup/db/seedData/projects.json')
const seedUsers = require('../../.setup/db/seedData/users.json')

const mongod = new MongodbMemoryServer()

async function before (t) {
  const mongoUri = await mongod.getConnectionString()
  mongoose.Promise = global.Promise
  mongoose.connect(mongoUri)
}

async function beforeEach (t) {
  const projects = seedProjects.map(formatObjectIDs)
  await saveData(projects, Project)
  t.context.projects = projects

  const users = seedUsers.map(formatObjectIDs)
  await saveData(users, User)
  t.context.users = users

  t.context.app = app
}

async function afterEach (t) {
  await Project.remove()
  await User.remove()
}

async function after (t) {
  mongoose.disconnect()
  mongod.stop()
}

function formatObjectIDs (data) {
  const newData = {}

  const oid = '$oid'
  for (const prop in data) newData[prop] = data[prop][oid] ? data[prop][oid] : data[prop]

  return newData
}

async function saveData (dataArr, Model) {
  for (const data of dataArr) {
    const entity = new Model(data)
    await entity.save()
  }
}

module.exports = { before, beforeEach, afterEach, after }
