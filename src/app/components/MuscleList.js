import React from "react"
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views'

const styles = theme => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const list = (chips) =>{
  let arrayCapsules = []
  let begin = 0
  let until = 8
  let insert = false
  let list = []
  while(begin!==chips.length){
    let chip = chips[begin]
    arrayCapsules = [ ...arrayCapsules, chip ]
    begin++

    if(begin===until){
      let switching = begin
      begin = until
      until = switching + 8
      insert = true
    }
    if(begin===chips.length){insert=true}

    if(insert) {
      console.log('llegoooo')
      list = [
        ...list,
        React.createElement('div', {}, [...arrayCapsules])
    ]
      
      arrayCapsules = null
      arrayCapsules = []
      insert = false
    }
  }
  return list
}

const MuscleList = ({ excercises, musclesByDetail, tagsNum, category, classes, fetchExcercises}) => {
  const chips = musclesByDetail.map(data => {
    let icon = null;
    return (
      <Chip
        className={classes.chip}
        clickable
        color='primary'
        key={data.id}
        icon={icon}
        label={data.name}
        onClick={() => fetchExcercises(data.id, data.name, excercises)}
      />
    );
  })

  return(
    <React.Fragment>
    <div className={classes.root}>{tagsNum>0?tagsNum+' tags to be selected':'Loading...'}</div>
    <SwipeableViews enableMouseEvents>
      {list(chips)}
      </SwipeableViews>
    </React.Fragment>
  )
}

export default withStyles(styles)(MuscleList)
  
/**
[1,2].map(item => (
  <div>
    {
      chips.map((chip, index, array )=> (
        <div>{chip}</div>
      ))
    }
  </div>
))
*/