import React from "react";
import { Component } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { IExercise } from "../../models/exercise.model";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import ExerciseForm from "./exercise-form/exercise-form";
import { IClosedQuestionExerciseModel } from "../../models/closed-question-exercise.model";
import { IListeningExercise } from "../../models/listening-exercise.model";
import { Solution } from "../../models/solution.model";
import { IOpenQuestionExercise } from "../../models/open-question-exercise.model";
import { ISpeakingExercise } from "../../models/speaking-exercise.model";

export interface IPropsExerciseForm {
  exercises: IExercise[];
  handleSubmit;
}
export interface IStatesExerciseForm {
  solutions: Solution[];
}
class Lesson extends Component<
IPropsExerciseForm,
IStatesExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [{
        pupilName: "string",
        exerciseName: "string",
        exerciseType: "string",
        answers: [],
      } as Solution]
    }
  }

  handleInput(e, element) {
    const { solutions } = this.state;
    solutions[element] = e.target.value;
    this.setState({ solutions });
  }

  handleSubmit(e) {
    // e.preventDefault();
    // this.setState({
    //   exercise: {
    //     question: name,
    //     closedAnswers: [],
    //   },
    // });
    this.props.handleSubmit(this.state.solutions);
  }

  render() {
    const { exercises } = {
      exercises: [
        {
          "@type": ExerciseTypesEnum.CLOSED_QUESTION,
          author: "Meffiu",
          question: "Czy lubisz placki?",
          closedAnswers:[
            {
              answer: "tak",
              correct: true
            },
            {
              answer: "nie",
              correct: false
            }],
        } as IClosedQuestionExerciseModel,
        {
          "@type": ExerciseTypesEnum.LISTENING,
          author: "Meffiu",
          text: ""
        } as IListeningExercise,
        {
          "@type": ExerciseTypesEnum.SPEAKING,
          author: "Meffiu",
          text: "komputer"
        } as ISpeakingExercise,
        {
          "@type": ExerciseTypesEnum.OPEN_QUESTION,
          author: "Meffiu",
          question: "Czy lubisz komputery?",
          acceptableOpenAnswers: ["tak", "nie"]
        } as IOpenQuestionExercise,
    ]
    };
    const { solutions } = this.state;
    return (
      <Form>
        {exercises.map((exercise, key) => {         
          return (
            <React.Fragment>
              <ExerciseForm key={key}
                exerciseNumber={key + 1}
                exercise={exercise}
                handleSubmit={this.handleSubmit}
              />
              <Dropdown.Divider />
            </React.Fragment>) 
        })} 
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>)
  }
}

export default Lesson;
