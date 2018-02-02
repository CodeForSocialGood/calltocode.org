import bindFunctions from '../../lib/bindFunctions'
import UserModel from '../../database/models/User'
import ForgotPasswordModel from '../../database/models/ForgotPassword'
import ProjectModel from '../../database/models/Project'
import mailer from '../../lib/mailer'
import { ForbiddenError, NotFoundError } from '../../lib/errors'

export default {
  _init (Users = UserModel, ForgotPasswords = ForgotPasswordModel, Projects = ProjectModel) {
    bindFunctions(this)

    this.Users = Users
    this.ForgotPasswords = ForgotPasswords
    this.Projects = Projects
    return this
  },

  async getCurrent (req, res) {
    const id = req.payload.id
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    return res.status(200).json(user.toJSON())
  },

  async putCurrent (req, res) {
    const id = req.payload.id
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    const newUser = Object.assign(user, { ...req.body })

    await newUser.save()

    return res.status(200).json(newUser.toJSON())
  },

  async getUsers (req, res) {
    const query = {}
    const sort = { createdAt: 'desc' }

    const users = await this.Users
      .find(query)
      .sort(sort)

    return res.status(200).json(users.map(user => user.toJSON()))
  },

  async createUser (req, res) {
    const user = new this.Users(req.body)
    const newUser = await user.save()

    return res.status(200).json(newUser.toJSON())
  },

  async getUser (req, res) {
    const user = req.user

    return res.status(200).json(user.toJSON())
  },

  async putUser (req, res) {
    const user = Object.assign(req.user, { ...req.body })
    const newUser = await user.save()

    return res.status(200).json(newUser.toJSON())
  },

  async login (req, res) {
    const { email, hash } = req.body
    const user = await this.Users.findOne({ email })

    if (!user || user.hash !== hash) throw new ForbiddenError('Invalid email or password')

    return res.status(200).json(user.toJSON())
  },

  async getSalt (req, res) {
    const { email } = req.query
    const user = await this.Users.findOne({ email })

    if (!user) throw new NotFoundError()

    return res.status(200).json({ salt: user.salt })
  },

  async applyForProject (req, res) {
    const userId = req.payload.id
    const user = await this.Users.findById(userId)

    if (!user) throw new NotFoundError()

    const projectId = req.params.projectId
    const project = await this.Projects.findById(projectId)

    if (!project) throw new NotFoundError()

    await user.applyForProject(projectId)
    await mailer.sendApplication(user, project)

    return res.status(200).json(user.toJSON())
  },

  async changePassword (req, res) {
    const { email, salt, hash } = req.body
    const user = await this.Users.findOne({ email })

    if (!user) throw new NotFoundError()

    user.salt = salt
    user.hash = hash

    await user.save()

    return res.status(200).json(user.toJSON())
  },

  async createCode (req, res) {
    const email = req.body.email
    const user = await this.Users.findOne({ email })

    if (!user) return res.sendStatus(200)

    const code = generateSixDigitCode()
    const options = { upsert: true, new: true }

    await this.ForgotPasswords.findOneAndUpdate({ email }, { email, code }, options)
    await mailer.sendPasswordCode(user, code)

    return res.sendStatus(200)
  },

  async validateCode (req, res) {
    const { email, code } = req.body
    const savedCode = await this.ForgotPasswords.findOne({ email, code })

    if (!savedCode) throw new NotFoundError('Invalid code')

    savedCode.remove()

    return res.sendStatus(200)
  },

  async userById (req, res, next, id) {
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    req.user = user
    next()
  }
}

function generateSixDigitCode () {
  return Math.floor(Math.random() * 900000) + 100000
}
