import {
  INVALIDATE_MUSCLE,
  REQUEST_MUSCLES,
  RECEIVE_MUSCLES,
  MUSCLES_BY_DEFAULT
} from "../constants/ActionTypes";
import { muscles as musclesByDefault } from '../store'

const muscles = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [...musclesByDefault]
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_MUSCLE:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_MUSCLES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_MUSCLES:
      const result = {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...action.items]
      };
      return result;
    case MUSCLES_BY_DEFAULT:
      console.log('MUSCLES BY DEFAULT reducer:'+state.muscles)
      return state
    default:
      return state;
  }
};

export default muscles;
