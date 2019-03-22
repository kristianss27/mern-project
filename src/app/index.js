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
import { MuiThemeProvider } from '@material-ui/core/styles';
//Inserting react router on my app
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';

const goldenTheme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiCardActionArea: {
      // Name of the rule
      focusHighlight: {
        pointerEvents: 'none',
        position: 'absolute',
        backgroundColor: 'currentcolor',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0
      },
    }
  },
  typography: {
    useNextVariants: true,
  },
    palette: {
      common: { black: 'rgba(0, 0, 0, 1)', white: 'rgba(255, 255, 255, 1)' },
      background: {
        paper: 'rgba(255, 255, 255, 1)',
        default: 'rgba(255, 255, 255, 1)'
      },
      primary: {
        light: 'rgba(205, 177, 62, 0.8)',
        main: 'rgba(194, 159, 15, 0.73)',
        dark: 'rgba(215, 179, 27, 1)',
        contrastText: 'rgba(255, 255, 255, 1)'
      },
      secondary: {
        light: 'rgba(255, 255, 255, 1)',
        main: 'rgba(0, 0, 0, 1)',
        dark: 'rgba(215, 179, 27, 1)',
        contrastText: 'rgba(255, 255, 255, 1)'
      },
      error: {
        light: 'rgba(167, 0, 30, 0.81)',
        main: 'rgba(167, 0, 30, 0.92)',
        dark: 'rgba(167, 0, 30, 1)',
        contrastText: '#fff'
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(3, 3, 3, 0.72)',
        disabled: 'rgba(205, 177, 62, 0.8)',
        hint: 'rgba(215, 179, 27, 1)'
      }
    }
  })

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
  <MuiThemeProvider theme={goldenTheme}>
    <Router>
      <Route exact path="/:filter?" component={App} />
    </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
