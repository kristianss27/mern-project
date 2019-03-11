import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import parse from 'html-react-parser'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'start',
    alignContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    marginTop: '65px',
    width: '320px'
  }
});

const SwipeableImg = ({classes,exercise}) => {
  const img = exercise.images.length>0?
        exercise.images.map(img => (
        <img className={classes.item} src={img} alt={'Image'} />
        ))
        :''

  return(
      <div className={classes.container}>
          {img}
        <Typography variant="subheading">
          {parse(exercise.description)}
        </Typography>
    </div>
    )
}

export default withStyles(styles)(SwipeableImg)