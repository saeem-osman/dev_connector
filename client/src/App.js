import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { Route, BrowserRouter as Router } from 'react-router-dom'
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
  if(currentTime < decoded.exp){
    //logout user
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
        </div>
        <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
