import React, { Fragment } from "react"
import {
  Grid,
  Typography,
  Card, CardMedia, CardContent, List, ListItem, ListItemText
} from "@material-ui/core"
import * as _properties from "../constants/Properties"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser'
import red from '@material-ui/core/colors/red'
import SwipeableViews from 'react-swipeable-views'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import toRenderProps from 'recompose/toRenderProps'
import withWidth from '@material-ui/core/withWidth'
import MainButton from "../containers/MainButton"
import SwipeableImg from './SwipeableImg'
import Drawer from '@material-ui/core/Drawer'

const styles = theme => ({
  root: {
    flexGrow: '1',
    overflow: 'hidden'
  },
  photos: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.secondary.main,
    }
  },
  card: {
    display: 'flex',
    padding: theme.spacing.unit * 1,
    marginTop: 5,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  desc: {
    display: 'flex',
    padding: theme.spacing.unit * 1,
    marginTop: 1,
    marginBottom: 1,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  cover: {
    width: 130,
    height: 130,
    margin: "auto",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  small: {
    '& svg': {
      fontSize: 18
    }
  },
  medium: {
    '& svg': {
      fontSize: 24
    }
  },
  large: {
    '& svg': {
      fontSize: 32
    }
  },
  cardDescription: {
    maxWidth: 400,
  },
  swipeable: {
    display:'inline-flex'
  },
  media: {

  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#981515'
  },
  flex: {
    flex: 1,
  },
  drawer: {
    width: '320',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '320',
  },
  drawerImage: {
    marginTop: 3,
    width: '320px'
  },
  textDesc: {
    marginTop: '70px',
    marginLeft: '170px'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const WithWidth = toRenderProps(withWidth());

class ExcerciseList extends React.Component{
  state = {
    index:0,
    open: false
  }

  handleClickOpen = excercise => e => {
    console.log(`VALUES ${excercise}`)
    this.props.onSelect(excercise)
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  handleChange = (value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeTab = (event,index) => {
    this.setState({
      index,
    });
  };

  render(){

  const { classes, excercises, category, onSelect, onDelete, excercise, openForm, onEdit, 
    match, location, history } = this.props
  const title = excercise.title ? excercise.title : "Excercise App";
  const description = excercise.title ? parse(excercise.description) : "Pick up an excercise from the left";
  const { index } = this.state
  const images = excercise.images
  ? excercise.images.map(item => {
      return(
          <CardMedia key={item} className={classes.media} image={item}/>
      )
  })
  :''
  console.log('REACT ROUTER')
  console.log(match)
  console.log(location)
  console.log(history)
  
  return(
    <div className={classes.root}>
    <div><MainButton /></div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={24}
      >
        {excercises.map(excercise => 
        { 
          
        return(
          <Grid item xs>
            <Card className={classes.card} onClick={this.handleClickOpen(excercise)}>
              <div className={classes.desc}>
                <CardMedia
                  className={classes.cover}
                  image={ excercise.images && excercise.images.length > 0
                    ? excercise.images[0]
                    :_properties.IMG_DEFAULT 
                  }
                  title="Live from space album cover"
                />
                <CardContent>
                  <Typography component="h5" variant="h5">
                    {excercise.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {parse(excercise.description.slice(1, 20))}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        )})}
      </Grid>  

      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" fontWeight="fontWeightLight" className={classes.flex}>
                OVERVIEW
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>

          <WithWidth>
          {
            ({ width }) => {
              if(width==='xs'){
                return(
                <div>
                <SwipeableImg exercise={excercise} />
                </div>
                )
              }
              else{
                return(
                  <div>
                  <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                      paper: classes.drawerPaper,
                    }}>
                    <List style={{marginTop: '55px'}}>
                      {
                        excercise.images.map((url, index) => (
                        <ListItem button key={index}>
                          <img src={url} className={classes.cover}/>
                        </ListItem>
                        ))}
                    </List>
                  </Drawer>
                  <Typography variant="subheading" className={classes.textDesc}>
                  {
                    description
                  }
                  </Typography>
                  </div>
                )
              }
              //return <div>{`Current width: ${width}`}</div>
            }
          }
          </WithWidth>
        </Dialog>
      </div>
    </div>
  )
}
}

ExcerciseList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExcerciseList);


