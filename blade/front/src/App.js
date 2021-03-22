 
import React, { Component } from 'react';
import Home from './components/pages/Home/Home';
import Error from './components/pages/Error/Error';
import Publications from './components/pages/Publications/Publications';
import KnowledgeBase from './components/pages/KnowledgeBase/KnowledgeBase';
import Recommendation from './components/pages/Recommendation/Recommendation';
import NavbarLayout from './components/parts/NavbarLayout/NavbarLayout';
import FooterLayout from './components/parts/FooterLayout/FooterLayout';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * App : main component, contains a router which redirects to a specified page of the app depending of the taken route
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarLayout/>
        <Router>
          <Switch>
            <Route exact path='/recommendation' component={Recommendation}/>
            <Route exact path='/publications' component={Publications}/>
            <Route exact path='/knowledge_base' component={KnowledgeBase}/>
            <Route exact path='/' component={Home}/>
            <Route 
              default 
              render={
                () => <Error 
                        errorCode={404} 
                        errorMsgShort={"Page not found"} 
                        errorMsgLong={"This page does not exists. Please return to the previous page or the menu."} 
                      />
              }/>
          </Switch>
        </Router>
        <div id="footer">
        <FooterLayout/>
        </div>
      </div>
    );
  }
}

export default App;