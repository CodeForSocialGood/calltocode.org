import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

export class PostsNew extends Component {
  // renderTitleField takes a parameter of field
  // field contains some event handlers that we need to wire up to the JSX that we are returning
  renderField (field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input 
          type="text"
          className="form-control"
          // field.input is an object which contains a bunch of different event-handlers like onchange, onblur...
          {...field.input}
        />
        {field.meta.error} {/* This is where the error from the validate() function is rendered */}
      </div>
    )
  }

  onSubmit (values) {
    console.log('values', values)
  }

  render () {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title"
          // When redux-form goes to render a field, it will automatically check the object returned by the validate() function
          // to see the name of this Field is associated with a title
          name="title" 
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

function validate(values) {
  // console.log('values', values) => { title, categories, content }
  const errors = {}

  if (!values.title) {
    // If this line gets executed, the form won't be submitted
    errors.title = 'Enter a title!'
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories'
  }
  if (!values.content) {
    errors.content = 'Enter some content please'
  }


  // If we return an empty object here, redux assumes that the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
  // fields: ['title', 'categories', 'content']
})(PostsNew)
