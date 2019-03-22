import React, { Component, Fragment } from "react";
import { Header } from "./Layouts";
import Excercises from "../containers/Excercises";
import Footer from "../containers/Footer";
import { connect } from 'react-redux'
import { musclesByDefault } from '../actions'
import { Switch, Route, withRouter} from 'react-router-dom'
import Routine from "./Routine";


class App extends Component {

  componentDidMount(){
    //console.log('MUSCLES BY DEFAULT: '+this.props.preLoadMuscles)
    //this.props.dispatch(musclesByDefault(this.props.preLoadMuscles))
  }

  componentDidUpdate(prevProps) {
    console.log('Did update')
    /*console.log('MUSCLES BY DEFAULT2: ' + this.props.preLoadMuscles)
    if (prevProps.muscles !== this.props.muscles) {
      this.props.dispatch(
        musclesByDefault(this.props.preLoadMuscles)
      );
    }*/
  }

  render() {
    const { filter } = this.props
    console.log(filter)
    return (
      <Fragment>
        <Header filter={filter || ''}/>
        
        <Route exact path='/' component={Excercises} />
        <Route exact path='/exercises' component={Excercises} />
        <Route path='/routine' component={Routine} />

        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(connect(
  (state,ownProps) => ({
    preLoadMuscles: state.muscles,
    filter: ownProps.match.params.filter
  })
)(App))
