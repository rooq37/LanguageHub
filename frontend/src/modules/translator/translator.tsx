import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { LanguageCodesEnum } from "../../enums/language-codes.enum";
import { TranslateKindsEnum } from "../../enums/translate-kinds.enum";
import { IRootState } from "../../store";
import Record from "./record";
import {
  translateText,
  translateSynethesize,
  getTextFromSound,
} from "../../store/translate/actions";

export interface ITranslatorProps extends StateProps, DispatchProps {}
export interface ITranslatorStates {
  text: string;
  fromto: TranslateKindsEnum;
}

class Translator extends Component<ITranslatorProps, ITranslatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      fromto: TranslateKindsEnum.PL_EN,
    };
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleLangChange(event) {
    this.setState({ fromto: event.target.value });
  }

  sendTranslate() {
    if (this.state.fromto === TranslateKindsEnum.PL_EN) {
      this.props.translateText(
        LanguageCodesEnum.PL,
        LanguageCodesEnum.EN,
        this.state.text
      );
    } else {
      this.props.translateText(
        LanguageCodesEnum.EN,
        LanguageCodesEnum.PL,
        this.state.text
      );
    }
  }

  sendSynethetize() {
    this.props.translateSynethesize(this.props.output);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.textToTranslate != null &&
      prevProps.textToTranslate !== this.props.textToTranslate
    ) {
      this.setState({
        text: this.props.textToTranslate,
      });
    }
  }

  render() {
    const { output, sound, textToTranslate } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                Please input your text for translation below:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={this.handleTextChange.bind(this)}
                value={this.state.text}
              />
            </Form.Group>
            <Record
              onStop={(blobUrl) => this.props.getTextFromSound(blobUrl)}
            />
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Language</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleLangChange.bind(this)}
                defaultValue={this.props.textToTranslate}
              >
                <option value={TranslateKindsEnum.PL_EN}>
                  Polish -{">"} English
                </option>
                <option value={TranslateKindsEnum.EN_PL}>
                  English -{">"} Polish
                </option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={this.sendTranslate.bind(this)}
              disabled={!this.state.text}
            >
              Translate
            </Button>
          </Col>
          <Col>
            Output:
            <p>{output}</p>
            <div hidden={!output}>
              {sound ? (
                <audio
                  src={"data:audio/mp3;base64," + sound}
                  controls
                  autoPlay
                />
              ) : (
                <Button
                  variant="primary"
                  onClick={this.sendSynethetize.bind(this)}
                  disabled={!this.state.text}
                >
                  <FontAwesomeIcon icon={faVolumeUp} />
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ translate }: IRootState) => ({
  output: translate.translateResponse.translatedText,
  sound: translate.sound,
  textToTranslate: translate.textToTranslate,
});

const mapDispatchToProps = {
  translateText,
  translateSynethesize,
  getTextFromSound,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Translator);
