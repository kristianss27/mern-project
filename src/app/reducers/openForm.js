import { OPEN_FORM } from "../constants/ActionTypes";

const openForm = (state = false, action) => {
  switch (action.type) {
    case OPEN_FORM:
      return action.openForm;
    default:
      return state;
  }
};

export default openForm;
