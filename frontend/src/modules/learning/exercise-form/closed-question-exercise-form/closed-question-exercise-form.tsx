import React from "react";
import "./closed-question-exercise-form.css"
import { Component } from "react";
import { Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IClosedQuestionExerciseModel } from "../../../../models/closed-question-exercise.model";
import { Solution } from "../../../../models/solution.model";

export interface IPropsClosedQuestionExerciseForm {
  exerciseNumber: Number;
  exercise: IClosedQuestionExerciseModel;
  handleSubmit;
}
export interface IStatesClosedQuestionExerciseForm {
  solution: Solution;
}
class ClosedQuestionExerciseForm extends Component<
  IPropsClosedQuestionExerciseForm,
  IStatesClosedQuestionExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        pupilName: "Meffiu",
        exerciseName: this.props.exercise.name,
        exerciseType: ExerciseTypesEnum.CLOSED_QUESTION,
        answers: []
      },
    };
  }

  handleInput(e, element) {
    const { exercise } = this.props;
    exercise[element] = e.target.value;
  }

  handleSubmit(e) {
    // e.preventDefault();
    // this.setState({
    //   exercise: {
    //     question: name,
    //     closedAnswers: [],
    //   },
    // });
    this.props.handleSubmit(this.state.solution);
  }

  render() {
    const { exercise } = this.props;
    return (
      <React.Fragment>
        <p className="exerciseClosedTitle">{"Exercise " + this.props.exerciseNumber}</p>
        <p className="exerciseClosedQuestion">{exercise.question}</p>
        <Form.Group controlId="formClosedAnswer">
          {exercise.closedAnswers.map((answer, key) => {
            return (
              <Form.Check type="checkbox" label={answer.answer} key={key} value={this.state.solution.answers[key]}/>
            )
          })}
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default ClosedQuestionExerciseForm;
