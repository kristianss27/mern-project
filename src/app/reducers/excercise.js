import { SET_EXCERCISE } from "../constants/ActionTypes";

const excercise = (state = {}, action) => {
  switch (action.type) {
    case SET_EXCERCISE:
      return action.excercise;
    default:
      return state;
  }
};

export default excercise;
