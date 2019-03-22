import * as types from '../constants/ActionTypes'
export default function workout(
  state = {
    name: '',
    date: '',
    exercises: [],
    trainner: '',
    createdBy: ''
  },
  action
) {
  switch (action.type) {
    case types.ADD_EXERCISE_TO_WORKOUT:
      return {
        ...state,
        exercises: [...state.exercises, action.exercise]
      }
    case types.DELETE_EXERCISE_FROM_WORKOUT:
      return {
        ...state,
        exercises: [
          ...state.exercises.filter(
            exercise => exercise.id !== action.idExercise
          )
        ]
      }
    default:
      return state
  }
}
