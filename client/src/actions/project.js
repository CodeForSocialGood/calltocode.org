import { POPULATE_OPPS, GET_OPPS_APPLIED_FOR } from './types'

import oppsApiClient from '../api/opportunities'

function getOppsAppliedFor (user) {
  return async dispatch => {
    const response = await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)
    if (response.status === 200) {
      const opps = await response.json()
      dispatch({
        type: GET_OPPS_APPLIED_FOR,
        payload: opps
      })
    }
  }
}

function populateOpps () {
  return async dispatch => {
    const response = await oppsApiClient.getAllOpps()
    if (response.status === 200) {
      const opps = await response.json()
      dispatch({
        type: POPULATE_OPPS,
        payload: opps
      })
    }
  }
}

export {
  getOppsAppliedFor,
  populateOpps
}
