import React, { Component } from "react";
import "./app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootswatch/dist/flatly/bootstrap.min.css";
import Navigation from "../common/navigation/navigation";
import About from "../about/about";
import Footer from "../common/footer/footer";
import Home from "../home/home";
import Translator from "../translator/translator";
import Login from "../login/login";
import { Container } from "react-bootstrap";
import ExercisesList from "../exercise/exercises.list";
import CreateExercise from "../exercise/create-exercise";

class App extends Component {
  render() {
    return (
      <div id="main">
        <Navigation />
        <div id="content">
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/translator" component={Translator} />
              <Route exact path="/exercises" component={ExercisesList} />
              <Route path="/exercises/new" component={CreateExercise} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
            </Switch>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
