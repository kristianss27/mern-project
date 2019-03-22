import { connect } from "react-redux";
import DialogExercise from "../components/DialogExercise";
import { openForm, 
  setExcercise, editExcercise} from "../actions";
import { muscles } from "../store";

const mapStateToProps = (state, ownProps) => ({
  muscles,
  openForm: state.openForm,
  excercise: state.excercise
})

const mapDispatchToProps = (dispatch,ownProps) => ({
  handleToggle: (open) => {
    dispatch(openForm(open))
  },
  setExcercise: (excercise) => {
    dispatch(setExcercise(excercise))
  },
  editExcercise: (excercise) => {
    dispatch(editExcercise(excercise))
    dispatch(openForm(false))
    dispatch(setExcercise({}))
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(DialogExercise);
