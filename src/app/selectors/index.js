import { createSelector } from "reselect";

const getExcercise = state => state.excercise;
const getExcercises = state => state.excercises;

export const getVisibleTodos = createSelector(
  [getExcercise, getExcercises],
  (excercise, excercises) => {
    switch (excercise) {
      case "all":
        return excercises;
      default:
        throw new Error("Unknown filter: " + getExcercise);
    }
  }
);

export const getCompletedTodoCount = createSelector([getExcercises], todos =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);
