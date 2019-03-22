import React, { Fragment, Component } from 'react'
import * as constants from '../constants/GlobalConstants'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Chip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import ExerciseForm from './ExerciseForm'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  },
  imagesContainer: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  select: {
    marginTop: theme.spacing.unit * 2
  },
  fragment: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  buttons: {
    marginInlineStart: 'auto'
  },
  buttonRoot: {
    borderRadius: '20%'
  },
  errorBox: {
    color: 'red', 
    marginTop: '.1rem',
    alignSelf: 'flex-end'
  }
})

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      excercise: {
        title: '',
        description: '',
        muscles: ''
      }
    }

    //is invoked immediately after updating occurs.
    //This method is not called for the initial render.
    componentDidUpdate(prevProps) {
      if (prevProps.openForm !== this.props.openForm) {
        this.setState({ open: this.props.openForm })
      }
      if (prevProps.excercise !== this.props.excercise) {
        this.setState((state, props) => ({
          excercise: props.excercise
        }))
      }
    }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        excercise: {
          ...this.state.excercise,
          [name]: value
        }
      })
    }

    handleSubmit = action => () => {
      const { excercise } = this.state

      if (action === constants.CREATE) {
        this.props.addExcercise({
          ...excercise,
          id: excercise.title.toLocaleLowerCase().replace(/ /g, '-')
        })
      } else if (action === constants.EDIT) {
        this.props.editExcercise(excercise)
      } else {
        console.log('ERROR')
      }

      this.setState({
        open: false,
        excercise: {
          title: '',
          description: '',
          muscles: ''
        }
      })
    }

    render() {
      const { open } = this.state,
        {
          classes,
          muscles: categories,
          handleToggle,
          setExcercise,
          openForm,
          excercise: { title = '', description = '', muscles = '' }
        } = this.props

      const buttonText = title === '' ? constants.CREATE : constants.EDIT
      return (
        <Fragment>
          <Chip
            className={classes.fragment}
            avatar={
              <Fab size="small" color="secondary" aria-label="Add">
                {' '}
                <AddIcon />{' '}
              </Fab>
            }
            label="Add an exercise"
            clickable
            onClick={() => {
              setExcercise({})
              handleToggle(!openForm)
            }}
            variant="outlined"
            color="secondary"
          />
          <Dialog
            open={open}
            onClose={() => {
              setExcercise({})
              handleToggle(!openForm)
            }}
            aria-labelledby="form-dialog-title"
            scroll="body"
          >
            <DialogTitle id="form-dialog-title">
              New exercise
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Please fill out the form</DialogContentText>
              <ExerciseForm
                classes={classes}
                categories={categories}
                buttonText={buttonText}
              />
            </DialogContent>
          </Dialog>
        </Fragment>
      )
    }
  }
)

/**
 * To check the values the form gets through formik
 * import the librarie
 * import { DisplayFormikState } from './FormikHelper';
 * add the component:
 * <DisplayFormikState {...props} />
 */
