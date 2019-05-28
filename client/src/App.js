import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';

import setAuthToken from './utils/setAuthToken'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
//private route
import PrivateRoute from './components/common/PrivateRoute';

//dashboard

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/credentials/AddExperience';
import AddEducation from './components/credentials/AddEducation'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

//check for token
if(localStorage.jwtToken){
  //set auth token to the header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated to true for the login session
  store.dispatch(setCurrentUser(decoded));
  //check login expiration
  const currentTime = Date.now() /1000;
  if(decoded.exp < currentTime){
    //logout user
    //clear current profile
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
    //clear current profile
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends React.Component{
  
 
  render(){
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
        <Navbar />
        <Route path="/" exact component={Landing} />
        <div className="container">
          <Route path="/register" component={ Register } />
          <Route path="/login" component={ Login } />
          <Switch>
            <PrivateRoute exact  path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/add-experience" component={ AddExperience } />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/add-education" component={ AddEducation } />
          </Switch>
        </div>
        <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
