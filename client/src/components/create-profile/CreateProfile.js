import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
    state ={
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors: nextProps.errors})
      }
    }
    onSubmit =(e) =>{
      e.preventDefault();
      const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        instagram: this.state.instagram
      }
      this.props.createProfile(profileData,this.props.history)
    }
    onChange = (e) =>{
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: '* Select profesional status', value: 0},
      { label: 'Developer', value:'Developer' },
      { label: 'Junior Developer', value:'Junior Developer' },
      { label: 'Senior Developer', value:'Senior Developer' },
      { label: 'Manager', value:'Manager' },
      { label: 'Student', value:'Student' },
      { label: 'Instructor or Teacher', value:'Instructor or Teacher' },
      { label: 'Intern', value:'Intern' },
      { label: 'Other', value:'Other' },
      
    ]
    let socialInputs;
    if(displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup 
          placeholder="Twitter Profile"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
          />
          <InputGroup 
          placeholder="Facebook Profile"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
          />
          <InputGroup 
          placeholder="LinkedIn Profile"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.onChange}
          error={errors.linkedin}
          />
          <InputGroup 
          placeholder="Instagram Profile"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
          />
        </div>
      )
    }

    return (
      <div className="create-profile">
        <div className="container">
           <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">
                    Add some information to make your profile standout...
                </p>
                    <small className="d-block pb-3">* = required field </small>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                      placeholder="* Profile Handle"
                      name="handle"
                      value={this.state.handle}
                      onChange={this.onChange}
                      error={errors.handle}
                      info="A unique handle for your profile info"
                      />
                      <SelectListGroup
                      placeholder="Status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      error={errors.status}
                      options={options}
                      info="Your current career status"
                      />
                      <TextFieldGroup
                      placeholder="Company"
                      name="company"
                      value={this.state.company}
                      onChange={this.onChange}
                      error={errors.company}
                      info="Your work place"
                      />
                      <TextFieldGroup
                      placeholder="Website"
                      name="website"
                      value={this.state.website}
                      onChange={this.onChange}
                      error={errors.website}
                      info="Your website"
                      />
                      <TextFieldGroup
                      placeholder="Location"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                      error={errors.handle}
                      info="Your location"
                      />
                      <TextFieldGroup
                      placeholder="* Skills"
                      name="skills"
                      value={this.state.skills}
                      onChange={this.onChange}
                      error={errors.skills}
                      info="Please give us comma separated values for your skills sets (eg: JavaScript, HTML, C++, Python)"
                      />
                      <TextFieldGroup
                      placeholder="Github Username"
                      name="githubusername"
                      value={this.state.githubusername}
                      onChange={this.onChange}
                      error={errors.githubusername}
                      info="Please add your github username"
                      />
                      <TextAreaFieldGroup
                      placeholder="Short Bio"
                      name="bio"
                      value={this.state.bio}
                      onChange={this.onChange}
                      error={errors.bio}
                      info="Tell us something about yourself"
                      />
                      <div className="mb-4">
                        <button
                        type="button"
                        onClick={()=>{
                          this.setState(prevState =>({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }))
                        }}
                        className="btn btn-primary">Add Social Network Links</button>
                        <span className="text-muted">Optional</span>
                      </div>
                      {socialInputs}
                      <input type="submit" value="submit" className="btn btn-block btn-info" />
                    </form>
              </div>
           </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps  = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
