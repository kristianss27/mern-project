import { connect } from "react-redux";
import TabMuscles from "../components/TabMuscles";
import { setCategory } from "../actions";

const mapStateToProps = state => ({
  muscles: state.muscles.items ? state.muscles.items:[1],
  category: state.category
});

const mapDispatchToProps = dispatch => ({
    onSelect: id => {
      dispatch(setCategory(id));
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabMuscles);