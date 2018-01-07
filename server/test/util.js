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
  const options = { useMongoClient: true }
  mongoose.Promise = global.Promise
  mongoose.connect(mongoUri, options)
}

async function beforeEach (t) {
  const projects = seedProjects.map(formatData)
  await saveData(projects, Project)
  t.context.projects = projects

  const users = seedUsers.map(formatData)
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

function formatData (data) {
  return data['_id']['$oid']
    ? { ...data, _id: data['_id']['$oid'] }
    : { ...data }
}

async function saveData (dataArr, Model) {
  for (const data of dataArr) {
    const entity = new Model(data)
    await entity.save()
  }
}

module.exports = { before, beforeEach, afterEach, after }
