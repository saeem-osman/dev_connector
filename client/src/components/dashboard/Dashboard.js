import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileAction from './ProfileAction';
// import Spinner from '../common/spinner'

class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteButton = (e) =>{
        this.props.deleteAccount();
    }
  render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if(profile === null || loading ){
            dashboardContent = <i className="fa fa-spin fa-refresh">***</i>
        }else{
            //check if logged in user has profile data
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileAction />

                {/*  task to be complete*/}

                    <div style={{marginBottom: '60px'}}>
                        <button className="btn btn-danger" onClick={this.onDeleteButton}>Delete Account</button>
                    </div>
                    </div>
                )
            }else{
                 //user is logged in but has no profile
                 dashboardContent = (
                     <div>
                         <p className="lead text-muted">Welcome {user.name}</p>
                         <p>You have not yet setup a profile. Please add some info</p>
                         <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                     </div>
                 )
            }
        }

    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    {dashboardContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
