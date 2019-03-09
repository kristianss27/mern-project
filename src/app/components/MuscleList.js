import React from "react"
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const MuscleList = ({ excercises, musclesByDetail, tagsNum, category, classes, fetchExcercises}) => {
  return(
    <React.Fragment>
    <div className={classes.root}>{tagsNum>0?tagsNum+' tags to be selected':'Loading...'}</div>
    <Paper className={classes.root}>
      {musclesByDetail.map(data => {
          let icon = null;
          return (
            <Chip
              className={classes.chip}
              clickable
              color='secondary'
              key={data.id}
              icon={icon}
              label={data.name}
              onClick={() => fetchExcercises(data.id, data.name, excercises)}
            />
          );
        })}
      </Paper>
      </React.Fragment>
  )
}

export default withStyles(styles)(MuscleList)
  