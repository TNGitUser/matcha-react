import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"; 
import { Button } from "semantic-ui-react";
import "./components/layouts/sticky.js";

import { MenuBar } from './components/Navigation/NavBar.js';
import StickyLayout from './components/layouts/sticky.js';

const App = () => {
  const [machin, setMachin] = useState(0);
  const link = (i) => {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => {setMachin(machin+1)}}></Button>
        <p>
          You used <code>link {i}</code>.
          Machin = {machin}!
        </p>
      </header>
    );
  }
  
  return(
      <Router>
        <div className="App">
        <MenuBar items_left={["Pourquoi l'amour", "Le simulateur de l'amour", "L'équipe"]} items_right={["Connexion", "Inscription"]} path={["patate", "shop", "test", "sign_in", "sign_on"]} icon={logo} active='1'/>
        
        <Switch>
          <Route path="/patate">
            {home()}
          </Route>
          <Route path="/shop">
            {link(2)}
          </Route>
          <Route path="/test">
            <StickyLayout/>
          </Route>
          <Route path="/sign_in">
            {home()}
          </Route>
          <Route path="/Sign">
            <Redirect to="/patate" />
          </Route>
        </Switch>
        </div>
      </Router>
)}

const home = () => {
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


export default App;
