import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"; 

import {MenuBar} from './components/Navigation/NavBar.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
        <MenuBar items_left={["Home", "Link2", "Link3"]} items_right={["Sign"]} active='1'/>
        <Switch>
          <Route path="/Home">
            {home()}
          </Route>
          <Route path="/Link2">
            {link(2)}
          </Route>
          <Route path="/Link3">
            {link(3)}
          </Route>
          <Route path="/Sign">
            {home()}
          </Route>
          <Route path="/">
            <Redirect to="/Home" />
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
}

function home() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React and do awesome stuff !
      </a>
    </header>
  );
}

function link(i) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        You used <code>link {i}</code>.
      </p>
    </header>
  );
}

export default App;
