import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Profile from './components/profile/Profile';
import { connect } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ProfileList from './components/profile/ProfileList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar></Navbar>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/profiles/:user_id" component={Profile} />
              <Route path="/profiles-list" component={ProfileList} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);
