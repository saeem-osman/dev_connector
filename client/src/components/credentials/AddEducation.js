import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {
    state = {
        school: '',
        degree: '',
        major: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        
        const expData ={
            school: this.state.school,
            degree: this.state.degree,
            major: this.state.major,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(expData, this.props.history)
    }
    onCheck = (e) =>{
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go back</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="text-lead text-center">
                                Add your education information
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* school"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Your degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                
                                <TextFieldGroup
                                    placeholder="major"
                                    name="major"
                                    value={this.state.major}
                                    onChange={this.onChange}
                                    error={errors.major}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled': ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                        />
                                        <label htmlFor="current" className="form-check-label">
                                            Current Education
                                        </label>
                                </div>
                                

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return({
        profile: state.profile,
        errors: state.errors
    })
}

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))
