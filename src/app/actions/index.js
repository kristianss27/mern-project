import * as types from '../constants/ActionTypes'
import * as properties from '../constants/Properties.js'
import fetch from 'cross-fetch'

export const addExcercise = newExcercise => ({
  type: types.ADD_EXCERCISE,
  id: newExcercise.id,
  title: newExcercise.title,
  description: newExcercise.description,
  muscles: newExcercise.muscles
})

export const deleteExcercise = id => ({
  type: types.DELETE_EXCERCISE,
  id
})

export const editExcercise = excercise => ({
  type: types.EDIT_EXCERCISE,
  excercise
})

export const listExcercises = () => ({
  type: types.ALL_EXCERCISE
})

export const setExcercise = excercise => ({
  type: types.SET_EXCERCISE,
  excercise
})

export const openForm = openForm => ({
  type: types.OPEN_FORM,
  openForm
})

export const setCategory = category => ({
  type: types.SET_CATEGORY,
  category
})

//Manage muscles

//Action to load muscles from my local store
export const musclesByDefault = muscles => ({
  type: types.MUSCLES_BY_DEFAULT
})

export const selectMuscle = muscles => ({
  type: types.SELECT_MUSCLE,
  muscles
})

export const invalidateMuscle = muscles => ({
  type: types.INVALIDATE_MUSCLE,
  muscles
})

export const requestMuscles = muscles => ({
  type: types.REQUEST_MUSCLES,
  muscles
})

export const receiveMuscles = (muscles, json) => ({
  type: types.RECEIVE_MUSCLES,
  muscles,
  items: json.results.map(child => ({
    id: child.id,
    name: child.name
  })),
  receivedAt: Date.now()
})

//This is an action using fetch from cross-fetch
const fetchMuscles = muscles => dispatch => {
  //dispatch(requestMuscles(muscles));
  return fetch(properties.URL_MUSCLES)
    .then(response => response.json())
    .then(json => dispatch(receiveMuscles(muscles, json)))
    .catch(err => {
      //Gotta dispatch the method invalidateMuscle
      //so far there is just a console erro
      console.error('ERROR in fetchMuscles method: ' + err)
    })
}

const shouldFetchMuscles = (state, muscles) => {
  if (muscles.items.length > 0) {
    return false
  }

  if (muscles.isFetching) {
    return false
  }

  return true
}

export const fetchMusclesIfNeeded = muscles => (dispatch, getState) => {
  if (shouldFetchMuscles(getState(), muscles)) {
    return dispatch(fetchMuscles(muscles))
  }
}

/*--end*/

/*Manage muscles by detail*/
export const invalidateMusclesByDetail = musclesByDetail => ({
  type: types.INVALIDATE_MUSCLES_BY_DETAIL,
  musclesByDetail
})

export const requestMusclesByDetail = musclesByDetail => ({
  type: types.REQUEST_MUSCLES_BY_DETAIL,
  musclesByDetail
})

export const receiveMusclesByDetail = (musclesByDetail, json) => ({
  type: types.RECEIVE_MUSCLES_BY_DETAIL,
  musclesByDetail,
  items: json.results.map(child => ({
    id: child.id,
    name: child.name
  })),
  receivedAt: Date.now()
})

const fetchMusclesByDetail = musclesByDetail => dispatch => {
  //dispatch(requestMusclesByDetail(musclesByDetail));
  return fetch(properties.URL_MUSCLES_BY_DETAIL)
    .then(response => {
      if (response.status >= 400){
        dispatch(invalidateMusclesByDetail(musclesByDetail))
        throw new Error(
          `bad response from server using this endpoint:${
            properties.URL_MUSCLES_BY_DETAIL
          }`
        )
      }
      return response.json()
    })
    .then(json => dispatch(receiveMusclesByDetail(musclesByDetail, json))
    )
    .catch(err => {
      console.error(err)
    })
}

export const fetchMusclesIfNeededByDetail = muscles => (dispatch, getState) => {
  if (shouldFetchMuscles(getState(), muscles)) {
    return dispatch(fetchMusclesByDetail(muscles))
  }
}

export const requestExcercises = () => ({
  type: types.REQUEST_EXCERCISES
})

export const receiveExcercises = (excercises, json, muscleName) => {
  const excercisesFiltered = json.results.filter(excercise => {
    excercise.description =
      excercise.description.length > 0
        ? excercise.description
        : //.replace(/<p>/gi,'').replace(/<p>/gi,'').replace(/<ul>/gi,'')..replace(/<li>/gi,'')
          null
    return excercise.description !== null
  })
  return {
    type: types.RECEIVE_EXCERCISES,
    excercises,
    items: excercisesFiltered.map(item => ({
      id: item.id,
      title: item.name,
      muscles: muscleName,
      description: item.description
    })),
    receivedAt: Date.now()
  }
}

export const invalidateExcercises = (excercises) => ({
  type: types.INVALIDATE_EXERCISES,
  excercises
})

/** Fetch excercises by muscle */
export const fetchExcercisesByMuscle = (category, muscleName, excercises) => (
  dispatch,
  getState
) => {
  const endPoint = `https://wger.de/api/v2/exercise/?muscles=${category}&status=2&language=2&format=json`
  return fetch(endPoint)
    .then(response => {
      if (response.status >= 400) {
        dispatch(invalidateExcercises(excercises))
        throw new Error(
          `bad response from server using this endpoint:${endPoint}`
        )
      }
      return response.json()
    })
    .then(json =>
      dispatch(receiveExcercises(excercises, json, muscleName))
    )
    .catch(err => {
      console.error(err)
    })
}
