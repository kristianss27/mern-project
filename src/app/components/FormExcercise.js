import React, { Fragment, Component } from "react";
import * as constants from '../constants/GlobalConstants'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fab
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 500
  },
  select: {
    marginTop: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      excercise: {
        title: "",
        description: "",
        muscles: ""
      }
    };

    //is invoked immediately after updating occurs. 
    //This method is not called for the initial render.
    componentDidUpdate(prevProps) {
      //console.log(`openForm pre: ${prevProps.openForm}`)
      //console.log(`openForm post: ${this.props.openForm}`)
      if(prevProps.openForm!==this.props.openForm){
      this.setState({ open: this.props.openForm });
      }
      if(prevProps.excercise!==this.props.excercise){
        this.setState((state, props) => ({
          excercise: props.excercise
        }));
      }
    }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        excercise: {
          ...this.state.excercise,
          [name]: value
        }
      });
    };

    handleSubmit = action => () => {
      const { excercise } = this.state;

      if(action===constants.CREATE){
        this.props.addExcercise({
          ...excercise,
          id: excercise.title.toLocaleLowerCase().replace(/ /g, "-")
        });
      }
      else if(action===constants.EDIT){
        this.props.editExcercise(excercise)
      }

      else{
        console.log('ERROR')
      }

      this.setState({
        open: false,
        excercise: {
          title: "",
          description: "",
          muscles: ""
        }
      });
    };

    render() {
      const {
          open
        } = this.state,
        { classes, muscles: categories, 
          handleToggle,
          setExcercise, openForm, 
          excercise: { 
            title = '', 
            description = '', 
            muscles = '' } } = this.props;

      const buttonText = title===''?constants.CREATE:constants.EDIT;
      return (
        <Fragment>
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={() => {
              setExcercise({})
              handleToggle(!openForm)}
            }
          >
            <AddIcon />
          </Fab>
          <Dialog
            open={open}
            onClose={() => {
              setExcercise({})
              handleToggle(!openForm)}
              }
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Create a new excercise
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Please fill out the form</DialogContentText>
              <form className={classes.root}>
                <TextField
                  label="Title"
                  name={title}
                  value={this.state.excercise.title ? this.state.excercise.title : title}
                  className={classes.formControl}
                  onChange={this.handleChange("title")}
                  margin="normal"
                />
                <br />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="muscles">Muscles</InputLabel>
                  <Select
                    value={this.state.excercise.muscles ? this.state.excercise.muscles : muscles}
                    name={muscles}
                    className={classes.selectEmpty}
                    onChange={this.handleChange("muscles")}
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Description"
                  multiline
                  value={this.state.excercise.description ? this.state.excercise.description : description}
                  className={classes.formControl}
                  rowsMax="4"
                  name={description}
                  onChange={this.handleChange("description")}
                  margin="normal"
                />
                <br />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleSubmit(buttonText)}
              >
                {buttonText}
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
