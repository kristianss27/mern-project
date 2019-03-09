import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";
import { muscles } from "./store";
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as Actions from './actions'
import './style.scss';
//Inserting react router on my app
import { BrowserRouter as Router, Route } from 'react-router-dom'

const middleware = [thunk]
//if (process.env.NODE_ENV !== 'production') {
middleware.push(createLogger())

//middleware.push(initialState)
//}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

//store.dispatch(Actions.fetchMusclesIfNeeded(store.getState().muscles))
store.dispatch(Actions.fetchMusclesIfNeededByDetail(store.getState().musclesByDetail))

render(
  <Provider store={store}>
    <Router>
      <Route exact path="/:filter?" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
