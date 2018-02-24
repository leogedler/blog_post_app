import React, { Component} from 'react';
import { reduxForm, Field } from 'redux-form'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    renderField(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }


    // static contextTypes = {
    //     router: PropTypes.object
    // };

    onSubmit = (values) => {
        console.log(values);
        this.props.createPost(values, () => {
            // Blog post have been created, navigate the user to the index
            this.props.history.push('/');
        });
    };
    
    render(){

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
               <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>

        );
    }
}

function validate(values){
    const errors = {};

    if(!values.title || values.title.length < 3){
        errors.title = 'Enter a title that is at least 3 characters';
    }
    if(!values.categories){
        errors.categories = 'Enter a categories';
    }
    if(!values.content){
        errors.content = 'Enter some content';
    }

    // If errors is empty, the form is fine to submit
    // If errors has any properties, redux form asumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost }) (PostsNew)
);