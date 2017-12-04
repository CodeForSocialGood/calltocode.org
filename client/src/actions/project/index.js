import { ALL_OPPS, PROFILE_OPPS } from './types'

import api from '../../api'

export const allOpps = { type: ALL_OPPS }
export const profileOpps = { type: PROFILE_OPPS }

export default class ProjectActionCreator {
  static getProfileOpps (user) {
    return async dispatch => {
      const opps = user.usertype === 'contact'
        ? api.project.organization(user.organization)
        : api.project.applied(user.opportunitiesAppliedFor)

      dispatch({
        ...profileOpps,
        payload: opps
      })
    }
  }

  static populateOpps () {
    return async dispatch => {
      const opps = api.project.all()

      dispatch({
        ...allOpps,
        payload: opps
      })
    }
  }
}
