import React, { Component } from "react";
import "./app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";
import Navigation from "../common/navigation/navigation";
import About from "../about/about";
import Footer from "../common/footer/footer";
import Home from "../home/home";
import Translator from "../translator/translator";

class App extends Component {
  render() {
    return (
      <div id="main">
        <Navigation />
        <div id="content">
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/translator" component={Translator} />
            <Route path="/about" component={About} />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
