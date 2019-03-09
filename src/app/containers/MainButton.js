import { connect } from "react-redux";
import FormExcercise from "../components/FormExcercise";
import { addExcercise, openForm, 
  setExcercise, editExcercise} from "../actions";
import { muscles } from "../store";

const mapStateToProps = (state, ownProps) => ({
  muscles,
  openForm: state.openForm,
  excercise: state.excercise
})

const mapDispatchToProps = (dispatch,ownProps) => ({
  addExcercise: excercise => {
    dispatch(addExcercise(excercise))
    dispatch(openForm(false))
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(FormExcercise);
