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
import EditExercise from "../exercise/edit-exercise";
import SolveExercise from "../learning/solve-exercise";
import ExercisesToSolveList from "../learning/exercises-to-solve.list";
import LoadingBar from "react-redux-loading-bar";

class App extends Component {
  render() {
    return (
      <div id="main">
        <Navigation />
        <div>
          <LoadingBar showFastActions className="loadingBar" />
          <LoadingBar
            showFastActions
            className="longLoadingBar"
            scope="longTask"
            updateTime={1000}
            maxProgress={95}
            progressIncrease={10}
          />
        </div>
        <div id="content">
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/translator" component={Translator} />
              <Route exact path="/exercises" component={ExercisesList} />
              <Route path="/exercises/new" component={CreateExercise} />
              <Route
                path="/exercises/edit/:exerciseName"
                component={EditExercise}
              />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/exercises-to-solve/solve" component={SolveExercise}/>
              <Route path="/exercises-to-solve" component={ExercisesToSolveList} />
            </Switch>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
