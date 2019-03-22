import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Tabs } from '@material-ui/core'
import parse from 'html-react-parser'
import * as _properties from '../constants/Properties'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    overflowX: 'hidden',
    marginTop: '68px'
  },
  tab: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tabMobile: {
    display: 'flex',
  },
  item: {
    objectFit: "cover",
    maxWidth: "220px",
    maxHeight: "220px"
  },
  description: {
    marginTop: "5px",
    marginRight: "5px",
    marginLeft: "5px"
  }
});

const ExerciseOverview = ({classes,exercise,tabType='mobile'}) => {
  const img = exercise.images.length>0 ?
        exercise.images.map(img => (
        <img className={classes.item} src={img} alt={'Image'} />
        ))
        :<img className={classes.item} src={_properties.IMG_DEFAULT} alt={'Image'} />

  const tabs = tabType==='mobile'?classes.tabMobile:classes.tab
  return(
      <div>
      <div className={classes.root}>
        { img.length >2
        ?
          <Tabs
          value={false}
          classes={{
            flexContainer: tabs
            }}
          variant="scrollable"
          indicatorColor="primary"
          textcolor="primary"
          >
          {img}
          </Tabs>
        :<div>{img}</div>
        }
      </div>
      <div style={{display:'flex'}}>
        <Typography variant="body2" className={classes.description} align="left">
        {parse(exercise.description)}
      </Typography>
      </div>
      </div>
    )
    }
    
    export default withStyles(styles)(ExerciseOverview)
    
    /** <div className={classes.container}>
          {img}
          <Typography variant="subheading">
            {parse(exercise.description)}
          </Typography>
        </div>
    */