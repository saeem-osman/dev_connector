import React from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

function App() {
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

export default App;
