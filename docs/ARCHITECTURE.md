# Architecture Guide

Joining in on an existing project such as this can feel daunting due to the learning curve and the sheer amount of code that there is. This document serves as a guide to get familiar with this project's architecture & codebase:

- [Technology Stack](#stack)
- [Project Structure](#structure)
- [Client Architecture](#client)
- [Server Architecture](#server)

We've also gathered together some guides that we found were helpful. You may not need to dive into these right away, but these are here as a reference for when you face challenges during coding:

- [Front-end Guides](#front-end)
- [Back-end Guides](#back-end)
- [Database Guides](#database)

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

*This section is based on the architecture guide found [here](https://github.com/gothinkster/react-redux-realworld-example-app/wiki).*

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

*Todo*.

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
