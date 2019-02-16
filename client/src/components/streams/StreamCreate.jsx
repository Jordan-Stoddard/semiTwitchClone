import React from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux'
import {createStream} from '../../actions'

class StreamCreate extends React.Component {

 // renderError method takes in the meta data from redux-form to determine if the input has been touched and if the error object which is created in the validate function below our render method
 // has any properties, then we render a div with the error created in validate.
  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="ui error message">
        <div className="header">{error}</div>
        </div>
      )
    }
  }

  // renderInput takes in our input, which is the targeted <Field /> component, our label, which is the value of our label attribute on the target <Field /> component
  // and our meta data, which is an object that comes from a reduxForm action creator, we pass this in to renderInput so that we can pass it into renderError, it lets us know if the input has been
  // touched or not, and we use that information to know when to render the error.
  renderInput = ({ input, label, meta }) => {
    // Here we're making a conditionally rendered className. If meta.error & meta.touched is true, then render the string 'field error' if not just render 'field'.
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (

      // returns our JSX for our form field. we call this method inside the component={} attribute inside of our individual <Field /> components.
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  };

  // onSubmit is a method that takes in our formValues then calls our createStream action with the formValues passed in.
  onSubmit = (formValues) => {
    this.props.createStream(formValues)
  }

  render() {
    return (
      <div>
                                    {
                                      //handleSubmit is a method we get from reduxForm to submit content from our <Field /> components.
                                    }
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

// Validate takes in the formValues that come from reduxForm and instantiates an empty errors object. If the formValues object that comes from reduxForm does not have a title property then we set
// an property inside the errors object called errors.title and set the value to a string that tells the user to enter a title.
// It does the same process checking if the formValues object has a value inside it's description property and if it doesn't it sets the errors object to have a string value telling the user to
// enter a description in the form input.
const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'You must enter a title.'
    }
    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }
    return errors
}
// Sets the value of StreamCreate being wrapped by the reduxForm Higher Order Component to be formWrapped
const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);
               
              // Wraps the formWrapped StreamCreate component with connect so that this component has createStream action on props.
export default connect(null, {createStream})(formWrapped)
