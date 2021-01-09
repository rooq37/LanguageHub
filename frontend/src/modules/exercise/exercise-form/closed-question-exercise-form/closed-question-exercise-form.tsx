import React from "react";
import { Component } from "react";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IClosedQuestionExerciseModel } from "../../../../models/closed-question-exercise.model";

export interface IPropsClosedQuestionExerciseForm {
  handleSubmit;
}
export interface IStatesClosedQuestionExerciseForm {
  exercise: IClosedQuestionExerciseModel;
}
class ClosedQuestionExerciseForm extends Component<
  IPropsClosedQuestionExerciseForm,
  IStatesClosedQuestionExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {
        "@type": ExerciseTypesEnum.CLOSED_QUESTION,
        author: "Meffiu",
      },
    };
  }

  handleInput(e, element) {
    const { exercise } = this.state;
    exercise[element] = e.target.value;
    this.setState({ exercise });
  }

  handleSubmit(e) {
    // e.preventDefault();
    // this.setState({
    //   exercise: {
    //     question: name,
    //     closedAnswers: [],
    //   },
    // });
    this.props.handleSubmit(this.state.exercise);
  }

  render() {
    return (
      <p>
        <input
          type="text"
          value={this.state.exercise.name || ""}
          onChange={(e) => this.handleInput(e, "name")}
          placeholder="name"
        />
        <input
          type="text"
          value={this.state.exercise.question || ""}
          onChange={(e) => this.handleInput(e, "question")}
          placeholder="question"
        />
        <button onClick={this.handleSubmit.bind(this)}>Save</button>
      </p>
    );
  }
}

export default ClosedQuestionExerciseForm;
