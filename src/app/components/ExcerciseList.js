import React, { Fragment } from 'react'
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import * as _properties from '../constants/Properties'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import toRenderProps from 'recompose/toRenderProps'
import withWidth from '@material-ui/core/withWidth'
import ExerciseOverview from './ExerciseOverview'
import Drawer from '@material-ui/core/Drawer'
import TabMuscles from '../containers/TabMuscles'
import ButtonWorkout from './ButtonWorkout'
import MainButton from '../containers/MainButton'

const styles = theme => ({
  root: {
    flexGrow: '1',
    overflow: 'hidden'
  },
  photos: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.secondary.main
    }
  },
  card: {
    flex: 'auto',
    color: theme.palette.text.secondary,
    marginTop: '2px',
    marginBottom: '1px'
  },
  desc: {
    display: 'flex',
    flexWrap: 'wrap', //nowrap (default) | wrap | wrap-reverse
    flexDirection: 'row', //row (default)| row-reverse | column | column-reverse;
    marginTop: 1,
    color: theme.palette.text.secondary,
    minHeight: '220px',
    minWidth: '220px',
    maxHeight: '220px',
    maxWidth: '220px'
  },
  cover: {
    objectFit: 'cover',
    maxWidth: '220px',
    maxHeight: '220px'
  },
  content: {
    objectFit: 'cover',
    maxWidth: '220px',
    maxHeight: '220px'
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
    maxWidth: 400
  },
  swipeable: {
    display: 'inline-flex'
  },
  media: {},
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1
  },
  flex: {
    flex: 1
  },
  drawer: {
    width: '320',
    flexShrink: 0
  },
  drawerPaper: {
    width: '320'
  },
  drawerImage: {
    marginTop: 3,
    width: '320px'
  },
  textDesc: {
    marginTop: '70px',
    marginLeft: '170px'
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const WithWidth = toRenderProps(withWidth())

class ExcerciseList extends React.Component {
  state = {
    index: 0,
    open: false
  }

  handleClickOpen = excercise => e => {
    this.props.onSelect(excercise)
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChangeIndex = index => {
    this.setState({
      index
    })
  }

  handleChange = value => {
    this.setState({
      index: value
    })
  }

  handleChangeTab = (event, index) => {
    this.setState({
      index
    })
  }

  render() {
    const {
      classes,
      exercises,
      category,
      onSelect,
      onDelete,
      exercise,
      openForm,
      onEdit,
      addToWorkout,
      match,
      location,
      history
    } = this.props
    const title = exercise.title ? exercise.title : 'Excercise App'
    const description = exercise.title
      ? parse(exercise.description)
      : 'Pick up an exercise from the left'
    const { index } = this.state
    const images = exercise.images
      ? exercise.images.map(item => {
          return <CardMedia key={item} className={classes.media} image={item} />
        })
      : ''

    return (
      <div className={classes.root}>
        <div>
          <TabMuscles />
        </div>
        <div>
          <MainButton />
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
        >
          {exercises.map(exercise => {
            return (
              <Grid item>
                <Card className={classes.card}>
                  <CardActionArea onClick={this.handleClickOpen(exercise)}>
                    <div className={classes.desc}>
                      <CardMedia
                        key={exercise.id}
                        component="img"
                        alt={exercise.title}
                        className={classes.cover}
                        image={
                          exercise.images && exercise.images.length > 0
                            ? exercise.images[0]
                            : _properties.IMG_DEFAULT
                        }
                        title={exercise.title}
                      />
                    </div>
                    <CardContent>
                      <Typography
                        component="subtitle1"
                        variant="subtitle1"
                        gutterBottom
                        color="inherit"
                      >
                        {exercise.title}
                      </Typography>
                      <Typography
                        component="subtitle2"
                        variant="subtitle2"
                        color="inherit"
                        gutterBottom
                      >
                        {exercise.images && exercise.images.length > 0
                          ?exercise.images[0].split("//")[1].split("/")[0]
                          :'add an image'
                        }

                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button variant="outlined" size="small" color="primary">
                      Share
                    </Button>
                    <ButtonWorkout exercise={exercise} />
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        <div>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar} color="white">
              <Toolbar color="white">
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}
                >
                  {exercise.title}
                </Typography>
                <ButtonWorkout preview={true} exercise={exercise} />
              </Toolbar>
            </AppBar>

            <WithWidth>
              {({ width }) => {
                if (width === 'xs') {
                  return (
                    <div>
                      <ExerciseOverview exercise={exercise} />
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <ExerciseOverview
                        exercise={exercise}
                        tabType="nomobile"
                      />
                    </div>
                  )
                }
                //return <div>{`Current width: ${width}`}</div>
              }}
            </WithWidth>
          </Dialog>
        </div>
      </div>
    )
  }
}

ExcerciseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExcerciseList)

/**
 * Include it on the render method to see the info of react router
 * console.log("REACT ROUTER");
    console.log(match);
    console.log(location);
    console.log(history);

 * Card style
 *     padding: theme.spacing.unit * 1,
    marginTop: 5,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,



 */
