import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGitHub from './ProfileGitHub';
import { getProfileByHandle } from '../../actions/profileActions'

class Profile extends Component {
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
  render() {
    return (
      <div> <h1>Profile Component</h1> </div>
    );
  }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
