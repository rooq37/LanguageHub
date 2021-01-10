import React from "react";
import "./closed-question-exercise-form.css"
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { IClosedQuestionExercise } from "../../../../models/closed-question-exercise.model";
import { ISolution } from "../../../../models/solution.model";

export interface IPropsClosedQuestionExerciseForm {
  exercise: IClosedQuestionExercise;
  handleSubmit;
}
export interface IStatesClosedQuestionExerciseForm {
  solution: ISolution;
}
class ClosedQuestionExerciseForm extends Component<
  IPropsClosedQuestionExerciseForm,
  IStatesClosedQuestionExerciseForm
> {
  constructor (props) {
    super(props);
    const { exercise } = this.props;
    this.state = {
      solution: {
        pupilName: "",
        exerciseName: exercise.name,
        exerciseType: exercise["@type"],
        answers: []
      }
    }
  }

  handleClosedAnswerChanged(e, element) {
    const solution = this.state.solution;
    if (element) {
      const index = solution.answers.indexOf(element);
      if (index === -1 && e.target.checked) {
        solution.answers.push(element);
      } else if(index !== -1 && !e.target.checked) {
        solution.answers.splice(index, 1);
      }
      this.setState({ solution: solution });
    }
  }

  handleSubmit(e) {
    this.props.handleSubmit(this.state.solution);
  }

  render() {
    const { exercise } = this.props;
    return (
      <React.Fragment>
        <p className="exerciseClosedTitle">Exercise</p>
        <p className="exerciseClosedQuestion">{exercise.question}</p>
        <Form.Group controlId="formClosedAnswer">
          {exercise.closedAnswers.map((answer, key) => {
            return (
              <Form.Check type="checkbox" label={answer.answer} key={key} onChange={e => this.handleClosedAnswerChanged(e, answer.answer)}/>
            )
          })}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => this.handleSubmit(e)}>
          Save
        </Button>
      </React.Fragment>
    );
  }
}

export default ClosedQuestionExerciseForm;
