export default {
  auth: {
    authenticated: false,
    error: ''
  },
  common: {
    appLoaded: false,
    appName: 'calltocode'
  },
  projects: {
    fetching: false,
    projects: [],
    error: {
      message: ''
    },
    recentProjects: {
      isLoading: false,
      projects: [],
      error: null
    }
  },
  users: {},
  applications: {
    fetching: false,
    applications: [],
    notSeenCounter: 0
  }
}
