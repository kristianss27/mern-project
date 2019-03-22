import * as types from "../constants/ActionTypes";
import * as properties from "../constants/Properties.js";

export const addExerciseToWorkout = exercise =>(
  {
    type: types.ADD_EXERCISE_TO_WORKOUT,
    exercise
  }
)

export const deleteExerciseFromWorkout = idExercise => (
  {
    type: types.DELETE_EXERCISE_FROM_WORKOUT,
    idExercise
  }
)