import { SET_CATEGORY } from '../constants/ActionTypes'

const category = (state = '', action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    default:
     return state;
  }
}

export default category