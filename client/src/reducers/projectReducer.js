import {
  POPULATE_OPPS
} from '../actions/types'

const defaultState = []

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case POPULATE_OPPS:
      return payload

    default:
      return state
  }
}
