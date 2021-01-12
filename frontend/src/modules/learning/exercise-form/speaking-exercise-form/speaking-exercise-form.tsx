import React from "react";
import "./speaking-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { ISolution } from "../../../../models/learning/solution.model";
import { ISpeakingExerciseForPupil } from "../../../../models/learning/speaking-exercise.model";
import Record from "../../../translator/record";
import { IRootState } from "../../../../store";
import { getTextFromSound, reset } from "../../../../store/translate/actions";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

export interface ISpeakingExerciseFormProps extends StateProps, DispatchProps {
  exercise: ISpeakingExerciseForPupil;
  handleSubmit;
}
export interface ISpeakingExerciseFormStates {
  solution: ISolution;
  inputText: string;
  validated: boolean;
}
class SpeakingExerciseForm extends Component<
  ISpeakingExerciseFormProps,
  ISpeakingExerciseFormStates
> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        pupilName: "Meffiu",
        exerciseName: this.props.exercise.name,
        exerciseType: ExerciseTypesEnum.SPEAKING,
        answers: [],
      },
      inputText: "",
      validated: false,
    };
  }

  componentDidMount() {
    this.props.reset();
  }

  handleInput(text) {
    const solution = this.state.solution;
    if (!solution.answers[0]) {
      solution.answers.push(text);
    } else {
      solution.answers[0] = text;
    }

    this.setState({ solution: solution });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.handleSubmit(this.state.solution);
    }

    this.setState({ validated: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.answer != null && prevProps.answer !== this.props.answer) {
      this.handleInput(this.props.answer);
      this.setState({
        inputText: this.props.answer,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form
          validated={this.state.validated}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <p className="exerciseSpeakTitle">{this.props.exercise.name}</p>
          <p className="exerciseSpeakQuestion">
            Click mic button and say: <b>{this.props.exercise.text}</b>
          </p>
          <Form.Group controlId="formRecord">
            <Record
              onStop={async (blobUrl) => {
                const audioBlob = await fetch(blobUrl).then((r) => r.blob());
                const sound = new File([audioBlob], "audiofile.mp3", {
                  type: "audio/mp3",
                });
                this.props.getTextFromSound(sound);
              }}
            />
            <br />
          </Form.Group>
          <Form.Group controlId="formOpenExerciseAnswer">
            <Form.Control
              readOnly
              type="plaintext"
              value={this.state.inputText}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={this.state.inputText.length === 0}
          >
            Save
          </Button>
          <i className="mr-1"></i>
          <LinkContainer to="/exercises-to-solve">
            <Button variant="danger">Cancel</Button>
          </LinkContainer>
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ translate }: IRootState) => ({
  answer: translate.textToTranslate,
});

const mapDispatchToProps = {
  getTextFromSound,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakingExerciseForm);
