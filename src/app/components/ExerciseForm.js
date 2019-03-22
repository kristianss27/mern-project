import React from 'react'
import {
  Button,
  ButtonBase,
  TextField,
  MenuItem,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { withFormik, Formik, Form, FieldArray, Field, getIn } from 'formik'
import * as Yup from 'yup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import { DisplayFormikState } from './FormikHelper'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import * as constants  from '../constants/Properties'

//Lets define our FormMilk using the HOC withFormik
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().max(26,'Only 26 characters').required('Title is required'),
    muscles: Yup.string().required('Select a muscle'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().of(Yup.string().url().matches(/\.(gif|jpg|jpeg|tiff|png)$/i).required(constants.imgRequired))
  }),
  mapPropsToValues: props => ({
    title: '',
    muscles: '',
    description: '',
    images: []
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { title, muscles, description, images } = values
    const exercise = {
      title,
      muscles,
      description,
      images
    }
    setTimeout(() => {
      //alert(JSON.stringify(payload, null, 2));
      props.addExcercise({
        ...exercise,
        id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
      })
      props.openForm(false)
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'MyForm'
})

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    classes,
    categories,
    buttonText
  } = props
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        id="title"
        label="*Title"
        variant="outlined"
        fullWidth={true}
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        margin="normal"
      />

      {errors.title && touched.title && (
        <div className={classes.errorBox}>{errors.title}</div>
      )}

      <TextField
        id="muscles"
        select
        fullWidth={true}
        label="*Muscle"
        value={values.muscles}
        onChange={handleChange('muscles')}
        onBlur={handleBlur('muscles')}
        margin="normal"
        variant="outlined"
      >
        {categories.map(category => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      {errors.muscles && touched.muscles && (
        <div className={classes.errorBox}>{errors.muscles}</div>
      )}

      <TextField
        id="description"
        value={values.description}
        label="*Description"
        variant="outlined"
        fullWidth={true}
        multiline
        rows="6"
        onChange={handleChange}
        onBlur={handleBlur}
        rowsMax="10"
        margin="normal"
      />
      {errors.description && touched.description && (
        <div className={classes.errorBox}>
          {errors.description}
        </div>
      )}

      <FieldArray
        name="images"
        render={arrayHelpers => (
          <div className={classes.root}>
            {values.images && values.images.length > 0 ? (
              values.images.map((image, index, array) => (
                <div key={`inside${index}`}>
                <div key={index} className={classes.imagesContainer}>
                  <Field name={`images.${index}`} component={InputComponent} />
                  <ButtonBase
                    focusRipple={false}
                    disableTouchRipple={true}
                    disableRipple={true}
                    color="secondary"
                    style={{margin:'9px'}}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <DeleteIcon />
                  </ButtonBase>
                  <Tooltip id={`msg${index}`} title={(array.length===constants.maximunImages)?`${constants.maximunImages} max`:`add`} placement="top">
                  <ButtonBase
                    focusRipple={false}
                    disableTouchRipple={true}
                    disableRipple={true}
                    color="secondary"
                    onClick={() => (array.length===constants.maximunImages)?'':arrayHelpers.insert(index+1, '')} // insert an empty string at a position
                  >
                    <AddIcon />
                  </ButtonBase>
                  </Tooltip>
                </div>
                <div className={classes.errorBox}>
                  <ErrorMessage name={`images.${index}`} />
                </div>
                </div>
              ))
            ) : (
              <Button
                variant="outlined"
                size="large"
                style={{marginTop: '16px',marginBottom: '3px'}}
                fullWidth={true}
                color="primary"
                onClick={() => arrayHelpers.push('')}
              >
                <AddIcon />
                Add Images
              </Button>
            )}
          </div>
        )}
      />

      <div className={classes.buttons}>
        <Button
          disabled={!dirty || isSubmitting}
          onClick={handleReset}
          color="primary"
          variant="contained"
          className={classes.formControl}
        >
          Reset
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          color="primary"
          variant="contained"
          className={classes.formControl}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  )
}

const ExerciseForm = connect(
  state => state,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(formikEnhancer(MyForm))

export default ExerciseForm

const InputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, handleChange, handleBlur }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <TextField
      label="*Image url"
      variant="outlined"
      fullWidth={true}
      {...field}
      {...props}
      margin="normal"
    />
)

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      let errorMsg = getErrorMsg(error)
      const touch = getIn(form.touched, name);
      return touch && error ? errorMsg : null;
    }}
  />
);

const getErrorMsg = error => {
    if(error!==null && error!==undefined){
      if(error.search(/following/g)!==-1) return constants.imageExtFailed
      else if(error.search(/URL/g)!==-1) return constants.imgRequired
      else return error
    } 
}
/**<DisplayFormikState {...props} /> */
