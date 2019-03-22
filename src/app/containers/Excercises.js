import { connect } from 'react-redux'
import ExcerciseList from '../components/ExcerciseList'
import { deleteExcercise, setExcercise, openForm } from '../actions'
import { muscles } from '../store'
import { withRouter } from 'react-router-dom'

const excercisesByMuscle = state => {
  if(state.category==='') return state.excercises.items
  else return state.excercises.items.filter(item => item.muscles===state.category)
}

const excercisesByMuscle2 = state => {
  let initMuscles = muscles.reduce(
    (excercises, category) => ({
      ...excercises,
      [category]: []
    }),
    {}
  );

  const result = Object.entries(
    state.excercises.items.reduce((excercises, excercise) => {
      const { muscles } = excercise;
      excercises[muscles] = excercises[muscles]
        ? [...excercises[muscles], excercise]
        : [excercise];
          
      return excercises;
    }, initMuscles)
  );
  console.log('RESULT: '+result)

  const lastMuscle = result.splice(result.length - 1, 1)
  result.unshift(...lastMuscle)
  return result

};

const mapStateToProps = state => ({
  exercises: excercisesByMuscle(state),
  category: state.category,
  exercise: state.excercise,
  openForm: state.openForm
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: excercise => {
    dispatch(setExcercise(excercise));
  },
  onDelete: id => {
    dispatch(deleteExcercise(id))
  },
  onEdit: (open,excercise) => {
    dispatch(openForm(open))
    dispatch(setExcercise(excercise));
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExcerciseList))
