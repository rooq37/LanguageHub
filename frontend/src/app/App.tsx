import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";
import Navigation from "../common/navigation/Navigation";
import About from "../about/About";
import Footer from "../common/footer/Footer";
import Home from "../home/Home";

class App extends Component {
  render() {
    return (
      <div id="main">
        <Navigation />
        <div id="content">
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
