import { combineReducers } from "redux"
import excercises from "./excercises"
import excercise from "./excercise"
import category from "./category"
import muscles from "./muscles"
import openForm from "./openForm"
import workout from "./workout"
import musclesByDetail from "./musclesByDetail"

const reducer = combineReducers({
  muscles,
  musclesByDetail,
  excercises,
  category,
  excercise,
  openForm,
  workout
});

export default reducer
