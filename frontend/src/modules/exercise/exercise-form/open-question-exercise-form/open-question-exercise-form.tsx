import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IOpenQuestionExercise } from "../../../../models/open-question-exercise.model";

export interface IPropsOpenQuestionExerciseForm {
  handleSubmit;
  exercise: IOpenQuestionExercise;
}
export interface IStatesOpenQuestionExerciseForm {
  exercise: IOpenQuestionExercise;
  openAnswers: string[];
  validated;
}
class OpenQuestionExerciseForm extends Component<
  IPropsOpenQuestionExerciseForm,
  IStatesOpenQuestionExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      exercise: {
        "@type": ExerciseTypesEnum.OPEN_QUESTION,
      },
      validated: false,
      openAnswers: [""],
    };
  }

  componentDidMount() {
    const { exercise } = this.props;
    if (exercise) {
      this.setState({
        exercise: exercise,
        openAnswers: exercise.acceptableOpenAnswers,
      });
    }
  }

  handleNewOpenAnswer() {
    const openAnswers = [...this.state.openAnswers, ""];
    this.setState({ openAnswers: openAnswers });
  }

  handleChangeOpenAnswer(evt, index) {
    const openAnswers = [...this.state.openAnswers];
    if (index >= 0) {
      openAnswers[index] = evt.target.value;
      this.setState({ openAnswers: openAnswers });
    }
  }

  handleDeleteOpenAnswer(index) {
    const openAnswers = [...this.state.openAnswers];
    if (index >= 0) {
      openAnswers.splice(index, 1);
      this.setState({ openAnswers: openAnswers });
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
      const { exercise } = this.state;
      exercise.acceptableOpenAnswers = this.state.openAnswers;
      this.props.handleSubmit(exercise);
    }

    this.setState({ validated: true });
  }

  render() {
    const { validated, openAnswers } = this.state;
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
          <Form.Label>Question*:</Form.Label>
          <Form.Control
            required
            type="text"
            value={this.state.exercise.question || ""}
            onChange={(e) => this.handleInput(e, "question")}
            placeholder="Question"
          />
          <Form.Control.Feedback type="invalid">
            Please enter the question.
          </Form.Control.Feedback>
        </Form.Group>

        <p>Acceptable open answers:</p>
        {openAnswers.map((openAnswer, index) => {
          return (
            <Row key={index}>
              <Col>
                <Form.Group>
                  <Form.Control
                    required
                    type="text"
                    value={openAnswer}
                    placeholder="Open answer"
                    onChange={(e) => this.handleChangeOpenAnswer(e, index)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the open answer!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                {index > 0 ? (
                  <Button
                    variant="danger"
                    onClick={(e) => this.handleDeleteOpenAnswer(index)}
                  >
                    <FontAwesomeIcon className="text-white" icon={faTrash} />
                  </Button>
                ) : null}
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={(e) => this.handleNewOpenAnswer()}
            >
              <FontAwesomeIcon className="text-white" icon={faPlus} />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default OpenQuestionExerciseForm;
