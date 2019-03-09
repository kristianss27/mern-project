import { connect } from "react-redux"
import MuscleList from "../components/MuscleList"
import { fetchExcercisesByMuscle } from '../actions'
import { countMuscles } from '../reducers/musclesByDetail'

const mapStateToProps = (
  state
)=>({
    musclesByDetail: state.musclesByDetail.items ? state.musclesByDetail.items : [],
    category: state.category,
    tagsNum: countMuscles(state),
    excercises: state.excercises 
})

const mapDispatchToProps = (
  dispatch,ownProps
) => ({
    fetchExcercises: (category, muscleName, excercises) => dispatch(fetchExcercisesByMuscle(category,muscleName,excercises))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuscleList)