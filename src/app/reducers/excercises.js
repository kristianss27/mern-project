import {
  ADD_EXCERCISE,
  DELETE_EXCERCISE,
  EDIT_EXCERCISE,
  REQUEST_EXCERCISES,
  RECEIVE_EXCERCISES,
  INVALIDATE_EXERCISES
} from "../constants/ActionTypes";
import { excercises as excercisesByDefault } from '../store'


export default function excercises(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [...excercisesByDefault]
  }
  , action) {
  switch (action.type) {
    case ADD_EXCERCISE:
    const array = {
      items:[
        ...state.items,
        {
          id: action.id,
          title: action.title,
          muscles: action.muscles,
          description: action.description,
        }
      ]
    }
      return array;
    case INVALIDATE_EXERCISES:
      return {
        ...state,
        didInvalidate: true
      }
    case DELETE_EXCERCISE:
      return{
        ...state,
        items: state.items.filter(excercise => excercise.id !== action.id)
      }
    case EDIT_EXCERCISE:
      return {
        ...state,
        items: state.items.map(excercise => {
        excercise= excercise.id===action.excercise.id
        ? action.excercise
        : excercise
        return excercise
      })
      }
    case REQUEST_EXCERCISES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_EXCERCISES:
      return {
        ...state,
        items: [
        ...action.items,...state.items
        ],
        isFetching: false,
        didInvalidate: false
      }
    default:
      return state;
  }
}
