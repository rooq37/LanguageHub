import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { PredefClosedAnswersEnum } from "../../../../enums/predef-closed-answers-types";
import { IClosedAnswer } from "../../../../models/closed-answer.model";
import { IClosedQuestionExercise } from "../../../../models/closed-question-exercise.model";
import FormButtons from "../form-buttons";

export interface IPropsClosedQuestionExerciseForm {
  handleSubmit;
  exercise: IClosedQuestionExercise;
}
export interface IStatesClosedQuestionExerciseForm {
  exercise: IClosedQuestionExercise;
  closedAnswers: IClosedAnswer[];
  validated;
  predefClosedAnswers: PredefClosedAnswersEnum;
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
      },
      validated: false,
      predefClosedAnswers: PredefClosedAnswersEnum.CUSTOM,
      closedAnswers: PredefClosedAnswersEnum.CUSTOM.value,
    };
  }

  componentDidMount() {
    const { exercise } = this.props;
    if (exercise) {
      this.setState({
        exercise: exercise,
        closedAnswers: exercise.closedAnswers,
      });
    }
  }

  handleNewClosedAnswer() {
    const closedAnswers = [
      ...this.state.closedAnswers,
      { answer: "", correct: false },
    ];
    this.setState({ closedAnswers: closedAnswers });
  }

  handleChangeClosedAnswer(evt, index, element) {
    const closedAnswers = [...this.state.closedAnswers];
    if (index >= 0) {
      const closedAnswer = closedAnswers[index];
      if (typeof closedAnswer[element] === "boolean") {
        closedAnswer[element] = evt.target.checked;
      } else {
        closedAnswer[element] = evt.target.value;
      }

      closedAnswers[index] = closedAnswer;
      this.setState({ closedAnswers: closedAnswers });
    }
  }

  handleDeleteClosedAnswer(index) {
    const closedAnswers = [...this.state.closedAnswers];
    if (index >= 0) {
      closedAnswers.splice(index, 1);
      this.setState({ closedAnswers: closedAnswers });
    }
  }

  handleInput(e, element) {
    const { exercise } = this.state;
    exercise[element] = e.target.value;
    this.setState({
      exercise,
      predefClosedAnswers: PredefClosedAnswersEnum.CUSTOM,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const { exercise } = this.state;
      exercise.closedAnswers = this.state.closedAnswers;
      this.props.handleSubmit(exercise);
    }

    this.setState({ validated: true });
  }

  handlePredefClosedAnswers(event) {
    let item = PredefClosedAnswersEnum.keys.find(
      (i) => i.variable === event.target.value
    );
    this.setState({ closedAnswers: item.value });
  }

  render() {
    const { closedAnswers, validated, predefClosedAnswers } = this.state;
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

        <Form.Group>
          <Form.Label>Predefined answers:</Form.Label>
          <Form.Control
            as="select"
            onChange={this.handlePredefClosedAnswers.bind(this)}
            value={predefClosedAnswers.variable}
          >
            {PredefClosedAnswersEnum.keys.map((key) => (
              <option key={key.variable} value={key.variable}>
                {key.variable}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <p>Acceptable closed answers:</p>
        {closedAnswers.map((closedAnswer, index) => {
          return (
            <Row key={index}>
              <Col xs={7}>
                <Form.Group>
                  <Form.Control
                    required
                    type="text"
                    value={closedAnswer.answer}
                    placeholder="Closed answer"
                    onChange={(e) =>
                      this.handleChangeClosedAnswer(e, index, "answer")
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the closed answer!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Is correct"
                    checked={closedAnswer.correct}
                    onChange={(e) =>
                      this.handleChangeClosedAnswer(e, index, "correct")
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                {index > 0 ? (
                  <Button
                    variant="danger"
                    onClick={(e) => this.handleDeleteClosedAnswer(index)}
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
            <FormButtons />
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={(e) => this.handleNewClosedAnswer()}
            >
              <FontAwesomeIcon className="text-white" icon={faPlus} />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ClosedQuestionExerciseForm;
