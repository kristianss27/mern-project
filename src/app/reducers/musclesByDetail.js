import {
  INVALIDATE_MUSCLES_BY_DETAIL,
  REQUEST_MUSCLES_BY_DETAIL,
  RECEIVE_MUSCLES_BY_DETAIL
} from '../constants/ActionTypes'

const musclesByDetail = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_MUSCLES_BY_DETAIL:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MUSCLES_BY_DETAIL:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MUSCLES_BY_DETAIL:
      const result = {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...action.items]
      }
      return result
    default:
      return state
  }
}

export const countMuscles = state => {
  return state.musclesByDetail.items.length
}

export default musclesByDetail
