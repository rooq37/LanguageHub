import React from "react";
import { Component } from "react";
import { Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IListeningExercise } from "../../../../models/listening-exercise.model";
import FormButtons from "../form-buttons";

export interface IPropsListeningExerciseForm {
  handleSubmit;
  exercise: IListeningExercise;
}
export interface IStatesListeningExerciseForm {
  exercise: IListeningExercise;
  validated;
}
class ListeningExerciseForm extends Component<
  IPropsListeningExerciseForm,
  IStatesListeningExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {
        "@type": ExerciseTypesEnum.LISTENING,
      },
      validated: false,
    };
  }

  componentDidMount() {
    const { exercise } = this.props;
    if (exercise) {
      this.setState({
        exercise: exercise,
      });
    }
  }

  handleInput(e, element) {
    const { exercise } = this.state;
    exercise[element] = e.target.value;
    this.setState({ exercise });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.handleSubmit(this.state.exercise);
    }

    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <Form.Group>
          <Form.Label>Name*:</Form.Label>
          <Form.Control
            required
            type="text"
            value={this.state.exercise.name || ""}
            onChange={(e) => this.handleInput(e, "name")}
            placeholder="Name"
            disabled={this.props.exercise != null}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Text*:</Form.Label>
          <Form.Control
            required
            type="text"
            value={this.state.exercise.text || ""}
            onChange={(e) => this.handleInput(e, "text")}
            placeholder="Text"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the text.
          </Form.Control.Feedback>
        </Form.Group>

        <FormButtons />
      </Form>
    );
  }
}

export default ListeningExerciseForm;
