const profileApiClient = {

  getUserByEmail (email) {
    const options = {
      method: 'POST'

    }

    return fetch(`/user/${id}`, options)
  },

  getUserById (id) {
    const options = {
      method: 'GET'
    }

    return fetch(`/user/${id}`, options)
  },

  getUsers () {
    const options = {
      method: 'GET'
    }

    return fetch(`/users`, options)
  }
}

export default profileApiClient
