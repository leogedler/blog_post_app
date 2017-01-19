import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'; 
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props){
        this.props.createPost(props)
            .then(()=>{
                // Blog post have been created, navigate the user to the index
                this.context.router.push('/');
            })
    };
    
    render(){

        const { fields: { title, categories, content }, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>

                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-helper">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-helper">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Content</label>
                    <textarea type="text" className="form-control" {...content} />
                    <div className="text-helper">
                        {content.touched ? content.error : ''}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};

    if(!values.title){
        errors.title = 'Enter a title';
    }
    if(!values.categories){
        errors.categories = 'Enter a categories';
    }
    if(!values.content){
        errors.content = 'Enter some content';
    }

    return errors;
}

// connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps
// reduxForm: 1st argument form config, 2nd argument is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm ({
    form: 'PostNewForm',
    fields:['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostNew);