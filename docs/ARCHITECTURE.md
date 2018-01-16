# Architecture Guide

Joining in on an existing project such as this can feel daunting due to the learning curve and the sheer amount of code that there is. This document serves as a guide to get familiar with this project's architecture & codebase:

- [Introduction](#intro)
- [Technology Stack](#stack)
- [Project Structure](#structure)
- [Client Architecture](#client)
- [Server Architecture](#server)

Reference for guides:

- [Front-end Guides](#front-end)
- [Back-end Guides](#back-end)
- [Database Guides](#database)

## <a name="intro"></a> Introduction

This guide is long; we recommend a few things:

- If you don't have much React/other framework or Node experience, start with learning either the front-end or the back-end. It can be a lot to tackle everything at once (even if you do have experience).
- At the bottom we've gathered together some guides that we found were helpful. You may not need to dive into these right away, but these are here as a reference for when you face challenges during coding.
- Have fun learning!

## <a name="stack"></a> Technology Stack

Call to Code is built with the following technologies:

- **Front-end**: React, HTML, SCSS
- **Back-end**: Node, Express
- **Database**: MongoDB w/ Mongoose

## <a name="structure"></a> Project Structure

Here is a breakdown of the project's structure (links are to more information in the sections below):

- `.deploy/` - deployment files (scripts)
- `.setup/` - setup files (scripts, seed data)
- `client/` - front-end files
  - `actions/` - [redux types, actions, and action creators](#reduxActions)
  - `api/` - handling client-side HTTP requests (connects us to our back-end REST API)
  - `components/` - components used throughout the site's pages
  - `middleware/` - [redux middleware](#reduxMiddleware)
  - `reducers/` - [redux reducers](#reduxReducers)
  - `test/` - client tests (excluding unit tests)
  - `App.js` - root component, where all other components are nested under
  - `index.*` - entry points
- `docs/` - documentation (setup, contributing, guides, etc.)
- `server/` - back-end files
  - `config/` - configuration files for anything on the server
  - `database/` - mongoose models and setup
  - `middleware/` - custom express middleware (user authentication, errorHandler)
  - `routes/` - routing to the REST API
    - `api/` - API endpoints (for example: POST `/project`)
    - `controllers/` - API implementations (for example: `createProject()`)
  - `test/` - server tests (excluding unit tests)
  - `app.js` - express app setup (global middleware, error handling, routes, etc.)
  - `index.js` - entry point (server creation)

## <a name="client"></a> Client Architecture

### Entry Point

File: `index.js`

Imports: `App.js`

Renders the root component:

```html
<Provider store={store}>
  <ConnectedRouter history={browserHistory}>
    <MuiThemeProvider>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </MuiThemeProvider>
  </ConnectedRouter>
</Provider>
```

File: `App.js`

Imports: `components/*.js`

Renders routes pointing to their associated components:

```html
<Header />
<Version />
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/create-project' component={CreateProjectForm} />
  <Route path='/forgot-password' component={ForgotPasswordForm} />
  <Route path='/login' component={LoginForm} />
  <Route path='/profile' component={restricted(Profile)} />
  <Route path='/signup' component={SignupForm} />
</Switch>
```

### API

Files: `api/*.js`

Imports: `./lib/apiRequest.js`

These files handle our client-side HTTP requests and connect us to our back-end REST API. Imports an object where each key handles creating a request with its corresponding http method.

- `DELETE`: `del (url, apiOptions, query) { .. }`
- `GET`: `get (url, apiOptions, query) { .. }`
- `POST`: `post (url, apiOptions, body) { .. }`
- `PUT`: `put (url, apiOptions, body) { .. }`

For example, in `api/projects.js`:

```javascript
const projectsApiClient = {
  getAllProjects (apiOptions) {
    return apiRequest.get('/projects', apiOptions)
  },

  getAppliedProjects (apiOptions, projectsAppliedFor) {
    const query = { projectsAppliedFor }
    return apiRequest.get('/projects', apiOptions, query)
  },

  getOrgProjects (apiOptions, id) {
    const query = { organization: id }
    return apiRequest.get('/projects', apiOptions, query)
  }
}
```

### Redux

#### Store

File: `index.js`

Imports: `reducers/*.js`, `middleware/*.js`

Fairly simple store setup, applies `promiseMiddleware`, then `thunkMiddleware`, then `localStorageMiddleware`, in that order. The ordering is described below. Also applies a loggerMiddleware in development.

#### <a name="reduxActions"></a> Actions

Files: `actions/**/*.js`

##### Actions

Actions are payloads of information that send data from the application to the redux store. They are the *only* source of information for the store. You `dispatch()` an action to send it to the store.

For example, in `actions/projects/index.js`:

```js
export const fetching = { type: FETCHING_PROJECTS }

store.dispatch(fetching)
```

The action itself is the `fetching` object. Notice how it only has a type. Actions must always have at least a `type` property. As a best practice, it is good to limit the properties of an action to `type`, `payload`, `error`, and `meta`.

##### Types

Types are unique string constants used as identifiers for actions. Each type corresponds to exactly one action. Action types are used in redux reducers in order to identify the action and update the store appropriately.

For example, in `actions/projects/types.js`:

```js
export const FETCHING_PROJECTS = 'FETCHING_PROJECTS'
export const RECEIVED_PROJECTS = 'RECEIVED_PROJECTS'
export const FAILED_PROJECTS = 'FAILED_PROJECTS'
````

##### Action Creators

Action creators return a *function* that can *dispatch* an action. This allows us to do asynchronous work such as call an API endpoint and wait for the results, and then dispatch an action when it finishes.

For example, in `actions/projects/index.js`:

```js
static fetchAllProjects () {
  return (dispatch, getState) => {
    dispatch(ProjectActionCreator.fetching())

    try {
      const state = getState()
      const apiOptions = apiOptionsFromState(state)
      const projects = projectsApiClient.getAllProjects(apiOptions)
      dispatch(ProjectActionCreator.received(projects))
    } catch (e) {
      console.trace(e)
      dispatch(ProjectActionCreator.failed(e))
    }
  }
}
```

#### <a name="reduxMiddleware"></a> Middleware

Files: `middleware/*.js`

All dispatched actions are passed through all of the redux middleware.

##### promiseMiddleware

Intercepts all actions where `action.payload` is a Promise. In which case it extracts the value or error out of the promise and re-dispatches it as a non-promise:

```js
return isPromise(action.payload)
  ? action.payload.then(
    result => store.dispatch({ ...action, payload: result }),
    error => store.dispatch({ ...action, payload: error, error: true })
  )
  : next(action)
```

##### thunkMiddleware

Intercepts all action creators and waits to dispatch an action until a certain condition is met.

For example, in `actions/auth/index.js`:

```js
static signup ({ email, password, isOrganization }) {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const apiOptions = apiOptionsFromState(state)
      const usertype = isOrganization ? 'contact' : 'volunteer'

      const user = await usersApiClient.signup(apiOptions, { usertype, email, password })
      dispatch(AuthActionCreator.login(user))
    } catch (e) {
      console.trace(e)
      throw new SignupException()
    }
  }
}
```

This action creator returns a function that allows us to do asynchronous work such as `await usersApiClient.signup(apiOptions, { usertype, email, password })`, and then dispatch an action when it finishes receiving that data with `dispatch(AuthActionCreator.login(user))`.

##### localStorageMiddleware

Runs after `promiseMiddleware` and `thunkMiddleware`. This ordering is important because `localStorageMiddleware` we want to make sure that we parse action creators and promises into action objects.

Intercepts actions with type:

- `LOGIN`: sets the user's token into localStorage with `localStorage.setItem('jwt', action.payload.token)`
- `LOGOUT`: removes the user's token from localStorage with `localStorage.removeItem('jwt')`

#### <a name="reduxReducers"></a> Reducers

File: `reducers/index.js`

Imports: `reducers/*.js`

Exports all reducers in a single object so that `combineReducers` can be easily used to combine them in the store.

##### General Reducer Patterns

- map payload into piece of state
- toggle loading states by casing on `FETCHING_*` and `RECEIVED_*`:

```javascript
case FETCHING_PROJECTS:
  return { ...state, fetching: true }

case RECEIVED_PROJECTS:
  return { ...state, fetching: false, projects: payload }
```

- toggle error states by checking `action.error` if it is there (see promiseMiddleware)

```javascript
const { payload, error } = action

...

case FAILED_PROJECTS:
  return { ...state, fetching: false, hasError: error, error: payload }
```

### Components

Accessing store state in components:

```js
function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    currentPage: state.routing.location.pathname,
    user: state.user
  }
}
```

Accessing action creators in components:

```js
import AuthActionCreator from '../../actions/auth'

const mapDispatchToProps = {
  logout: AuthActionCreator.logout
}
```

This allows us to dispatch actions inside of components.

*Notice how `mapStateToProps` and `mapDispatchToProps` end in `ToProps`. These properties get bound to the component's props, and are accessible with `this.props.<state/dispatch property>`.*

#### Root Component - "/"

*Mentioned above, but now we are building on our redux knowledge.*

File: `App.js`

Imports: `components/*.js`, `actions/auth/index.js`

Renders routes pointing to their associated components:

```html
<Header />
<Version />
<Switch>
  <Route exact path='/' component={Home} />
  <Route path='/create-project' component={CreateProjectForm} />
  <Route path='/forgot-password' component={ForgotPasswordForm} />
  <Route path='/login' component={LoginForm} />
  <Route path='/profile' component={restricted(Profile)} />
  <Route path='/signup' component={SignupForm} />
</Switch>
```

##### Mapping store to component props

Maps state to props to use in component:

```js
function mapStateToProps (state) {
  return {
    appLoaded: state.common.appLoaded
  }
}
```

Maps action creators to props to use in component:

```js
import AuthActionCreator from 'actions/auth'

const mapDispatchToProps = {
  appLoad: AuthActionCreator.appLoad
}
```

##### Lifecycle

We then trigger the `appLoad` action creator in the component's `componentDidMount` lifecycle. This triggers during component creation.

```javascript
componentDidMount () {
  this.props.appLoad()
}
```

In this situation `appLoad()` updates the `appLoaded` state for us which can be seen in `reducers/commonReducer.js`:

```js
case APP_LOAD:
  return { ...state, appLoaded: true }
```

This update is automatically passed to the component's bound `appLoaded` prop, which allows us to conditionally load the app's components based on that loaded state:

```js
// Conditionally calls two different functions
render () {
  return this.props.appLoaded
    ? this.renderAppLoaded()
    : this.renderAppNotLoaded()
}

// When the app has been loaded:
renderAppLoaded () {
  return (
    <div>
      <Header />
      <Version />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/create-project' component={CreateProjectForm}/>
        <Route path='/forgot-password' component={ForgotPasswordForm}/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/profile' component={restricted(Profile)}/>
        <Route path='/signup' component={SignupForm}/>
      </Switch>
    </div>
  )
}

// When the app isn't loaded yet:
renderAppNotLoaded () {
  return (
    <Header />
  )
}
```

#### Home Component - "/"

File: `components/Home/Home.js`

Imports: `actions/project/index.js`, `components/ListOfProjects/ListOfProjects.js`

Render's the home page which is a list of projects:

```js
render () {
  return (
    <ListOfProjects
      title={'Click To Apply'}
      projects={this.props.projects} />
  )
}
```

##### Mapping store to component props

Maps state to props to use in component:

```js
function mapStateToProps (state) {
  return {
    projects: state.project.projects
  }
}
```

Maps action creators to props to use in component:

```js
import ProjectActionCreator from 'actions/project'

const mapDispatchToProps = {
  onLoad: ProjectActionCreator.fetchAllProjects
}
```

##### Lifecycle

We then trigger the `onLoad` action creator in the component's `componentDidMount` lifecycle. This triggers during component creation.

```javascript
componentDidMount () {
  this.props.onLoad()
}
```

In this situation `onLoad()` is bound to the `fetchAllProjects` action creator:

```js
static fetchAllProjects () {
  return (dispatch, getState) => {
    dispatch(ProjectActionCreator.fetching())

    try {
      const state = getState()
      const apiOptions = apiOptionsFromState(state)
      const projects = projectsApiClient.getAllProjects(apiOptions)
      dispatch(ProjectActionCreator.received(projects))
    } catch (e) {
      console.trace(e)
      dispatch(ProjectActionCreator.failed(e))
    }
  }
}
```

This action creator starts by dispatching an action telling the store that it is starting to fetch projects. Then it asks the back-end for the projects, and dispatches another action (`received()`), telling the store that it received the projects. If anything fails along the way, the action (`failed()`) is dispatched instead.

Once the projects are received, the `projectReducer` updates the store appropriately:

```js
case RECEIVED_PROJECTS:
  return { ...state, fetching: false, projects: payload }
```

And the `projects` prop on the Home component is updated, passing the new value to `ListOfProjects`, which renders the projects accordingly.

#### Other Components

Other components can be understood by following the patterns described above.

## <a name="server"></a> Server Architecture

### Entry Point

File: `index.js`

Imports: `app.js`, `database/index.js`

Runs the server using the express app and connects to the database:

```js
const app = require('./app')
const { appConfig, databaseConfig } = require('./config')
const database = require('./database')._init(databaseConfig.url)

app.listen(appConfig.port, runServer)

async function runServer () {
  logger.log(`App listening on port ${this.address().port}`)

  try {
    await database.connect()
    logger.log('Database connected')
  } catch (error) {
    logger.error('Database connection error', error)
  }
}
```

### Express App

File: `app.js`

Imports: `express`, `middleware`, `routes/index.js`

Sets up and exports the express app, adding middleware and routes:

```js
const app = express()

app.use(express.static(appConfig.publicDir))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/', require('./routes'))
app.use(errorHandler())

module.exports = app
```

### Database

File: `database/index.js`

Imports: `mongoose`

Exports an object which has an `_init () {}` for setting itself up, and a `connect () {}` for connecting to the MongoDB through mongoose:

```js
const database = {
  _init (url, client = mongoose) {
    this.url = url
    this.client = client
    return this
  },

  connect () {
    this.client.connect(this.url, { useMongoClient: true })

    const db = this.client.connection
    return new Promise((resolve, reject) => {
      db.on('error', reject)
      db.once('open', resolve)
    })
  }
}

module.exports = database
```

Files: `database/models/*.js`

Imports: `mongoose`, `jsonwebtoken`\*, `config/authConfig.js`\*

\*: *Only the User model*

These files set up the mongoose models which tell us how to format the data we put in our MongoDB:

```js
const UserSchema = mongoose.Schema({
  usertype: {
    type: String,
    enum: ['contact', 'volunteer'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // ...
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
```

This model says that our users are going to have a required `usertype` whose value is required, can only be a string, and with value 'contact' or 'volunteer'. We also tell the model to automatically add timestamps, which gives our data auto-populated `createdAt` and `updatedAt` fields. We then register the model with `mongoose.model()`.

We can also define functions on the model which can be called on the data that we retrieve/create using this model (more on this below):

```js
const jwt = require('jsonwebtoken')
const { authConfig } = require('../../config')

UserSchema.methods.generateSessionToken = function () {
  const today = new Date()
  const expiration = new Date(today)
  const expirationDays = 14
  expiration.setDate(today.getDate() + expirationDays)

  return jwt.sign({
    id: this._id,
    exp: parseInt(expiration.getTime() / 1000)
  }, authConfig.jwtSigningKey)
}
```

This function allows us to easily generate a token for a user when they login or signup. This token is used to authenticate them when they make requests to the server, and is signed with an `id` and `exp` property (more on this below).

### Custom Middleware

Files: `middleware/*.js`

Middleware are functions that we can pass server requests through. You can use this to set up logging (`morgan` does this), authenticate a user before you finish a request (`auth.js`) or add error handling to the end of the request (`errorHandler.js`).

#### Auth Middleware

File: `middleware/auth.js`

Imports: `express-jwt`, `config/authConfig.js`

This middleware is something you can place in front of any api endpoint in order to check for the user's authentication token:

```js
function getTokenFromHeader (req) {
  if (req.headers.authorization) {
    const [preamble, token] = req.headers.authorization.split(' ')
    if (preamble === 'Token' || preamble === 'Bearer') {
      return token
    }
  }

  return null
}
```

The authentication itself happens internally in the `express-jwt` module, but we define two types of user authentication:

```js
const auth = {
  required: jwt({
    getToken: getTokenFromHeader,
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload'
  }),
  optional: jwt({
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    secret: authConfig.jwtSigningKey,
    userProperty: 'payload'
  })
}

module.exports = auth
```

- `auth.required` will require the user to be authenticated (logged in) for the request to succeed. If a user does not pass this authentication, the request will error with a 401 (unauthorized) status code.
- `auth.optional` does not require the user to be authenticated (logged in) for the request to succeed, but is instead used to potentially enhance the data being returned.

*Note: notice how `auth.required` and `auth.optional` both define a `userProperty: 'payload'`. This says that when the user is successfully authenticated, that the token will be parsed and any data that was signed into the token (user _id: `id`, and token expiration: `exp` in our case) will be added to the request object on its `payload` property. This will be explained more below.*

#### Error Handler Middleware

File: `middleware/errorHandler.js`

Imports: `logger.js`

This custom middleware is unique because it is specifically added to the very end of the app's middleware chain, after the routes. This is because we can forward any errors that occur in the routes to `next()` which is then caught by this middleware. An `err` parameter is added:

```js
function errorHandler () {
  return function (err, req, res, next) {
    logger.error(err)

    const error = { name: err.name, message: err.message, stack: err.stack }
    for (const prop in err) error[prop] = err[prop]

    return res.status(err.status || 500).json({ error })
  }
}
```

### Routes

Files: `routes/*.js`

The server's routes are where the API endpoints are defined.

#### Entry Point

File: `routes/index.js`

Imports: `express`

This file uses express router to define our endpoint base (`/api`), which says that all of our endpoints begin with that base:

```js
const router = require('express').Router()

router.use('/api', require('./api'))

module.exports = router
```

This points the request to:

File: `routes/api/index.js`

Imports: `express`

The file uses express router to further define our api endpoints:

```js
const router = require('express').Router()

router.use('/email', require('./email'))
router.use('/projects', require('./projects'))
router.use('/users', require('./users'))
router.use('/forgot-password', require('./forgotPassword'))

module.exports = router
```

For example, the users endpoints are now accessible at `/api/users`, and are further defined in `routes/api/users.js` (example continues below).

#### API

Files: `routes/api/*.js`

Imports: `express`

These files also use express router in order to once again further define our api endpoints and handle requests differently on each, for example in `routes/api/users.js`:

```js
const router = require('express').Router()

const auth = require('../../middleware/auth')
const usersController = require('../controllers/usersController')._init()

router.route('/current')
  .get(auth.required, usersController.getCurrent)
  .put(auth.required, usersController.putCurrent)

module.exports = router
```

This is the end of the endpoint definition:

- A `GET` request on `/api/users/current` will end up here, pass through our `auth.required` token authentication, and if successful, use our usersController `getCurrent` property to interact with the database.
- A `PUT` request on `/api/users/current` will do the same thing, except use the usersController `putCurrent` property.

These properties are functions.

#### Controllers

Files: `routes/controllers/*.js`

Imports: `database/models/*.js`

##### \_init

You may have noticed that when we were importing the usersController above, that we also called `._init()` on it:

```js
const usersController = require('../controllers/usersController')._init()
```

This function is used to bind the controller's model and own functions to itself:

```js
const usersController = {
  _init (Users = UserModel) {
    bindFunctions(this)

    this.Users = Users
    return this
  },
  // ...
}
```

This pattern allows us to easily mock the model in our controller unit tests.

##### Controller Implementations

The controller function implementations are where we interact with the database:

```js
const usersController = {
  // ...
  getCurrent (req, res, next) {
    const id = req.payload.id

    this.Users.findById(id).then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      return res.status(200).json(user.toJSON())
    }).catch(next)
  },
  // ...
}
```

Recall how the `req.payload` is populated with the parsing of the authentication token, explained in the Auth Middleware section above. We then use the parsed `id` to `findById()` the user and return the data back to the client with `return res.status(200).json(user.toJSON())`.

Also recall how we are calling `user.toJSON()`. We can do this because the `toJSON ()` function is defined on the mongoose User model in the same way that `generateSessionToken ()` was.

Lastly recall how we are using `.catch(next)` to catch any errors and forward them to `next` which passes everything to the error handler, as was mentioned above.

### Public files

Files: `public/*.*`

These files are the actual built and served files for the app. These are not meant to be touched or used for development.

## <a name="front-end"></a> Front-end Guides

The front-end consists of everything in the `client` folder.

- [Getting started with React](https://reactjs.org/tutorial/tutorial.html)
- [Getting started with Redux](https://egghead.io/series/getting-started-with-redux)
- [React with Redux](https://medium.com/@miguelsaddress/a-basic-react-redux-introductory-tutorial-adcc681eeb5e)
- [SCSS documentation](http://sass-lang.com/documentation/)
- [SCSS guide](http://sass-lang.com/guide)

## <a name="back-end"></a> Back-end Guides

The back-end consists of everything in the `server` folder.

- [Getting started with Node w/ Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node/Express/Mongoose guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- [REST API guidelines](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

## <a name="database"></a> Database Guides

This project uses MongoDB. On top of Mongo we use Mongoose, allowing us to define schemas/models for data. The relevant files are in the `server/database/` folder. Making any changes to the database typically means making changes to the schemas located in `server/database/models/`.

- [MongoDB documentation](https://docs.mongodb.com/)
- [Mongoose documentation](http://mongoosejs.com/docs/guide.html)
