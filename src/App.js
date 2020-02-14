import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ProfileList from './components/profile/ProfileList';
import ProfileEdit from './components/profile/ProfileEdit'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import MatchList from './components/profile/MatchList';

/*
<ProtectedRoute path="/profiles/:user_id" component={Profile} />
<ProtectedRoute path="/profiles-list" component={ProfileList} />
<ProtectedRoute path="/match" component={ProfileList} />
*/

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <ProtectedRoute path="/profiles/:user_id" component={Profile} />
            <ProtectedRoute path="/profiles-list" component={ProfileList} />
            <ProtectedRoute path="/profile-edit" component={ProfileEdit} />
            <ProtectedRoute path="/lucky" component={MatchList} />
            {/* <Route path="/profiles/:user_id" component={Profile} />
            <Route path="/profiles-list" component={ProfileList} />
            <Route path="/profile-edit" component={ProfileEdit} />
            <Route path="/match" component={ProfileList} /> */}
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/act/:token" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;