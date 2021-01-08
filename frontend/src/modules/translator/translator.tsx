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
  inputText: string;
  fromto: TranslateKindsEnum;
}

class Translator extends Component<ITranslatorProps, ITranslatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      fromto: TranslateKindsEnum.EN_PL,
    };
  }

  handleTextChange(event) {
    this.setState({ inputText: event.target.value });
  }

  handleLangChange(event) {
    this.setState({ fromto: event.target.value });
  }

  sendTranslate() {
    this.props.translateText(
      this.getFromLanguage(),
      this.getToLanguage(),
      this.state.inputText
    );
  }

  getFromLanguage() {
    return this.state.fromto === TranslateKindsEnum.PL_EN
      ? LanguageCodesEnum.PL
      : LanguageCodesEnum.EN;
  }

  getToLanguage() {
    return this.state.fromto === TranslateKindsEnum.PL_EN
      ? LanguageCodesEnum.EN
      : LanguageCodesEnum.PL;
  }

  sendSynethetize() {
    this.props.translateSynethesize(this.props.output, this.getToLanguage());
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.textToTranslate != null &&
      prevProps.textToTranslate !== this.props.textToTranslate
    ) {
      this.setState({
        inputText: this.props.textToTranslate,
      });
    }
  }

  render() {
    const { output, sound } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>
                <b>Please input text for translation</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={this.handleTextChange.bind(this)}
                value={this.state.inputText}
              />
            </Form.Group>
            <Form.Row>
              <Col>
                <div hidden={this.state.fromto === TranslateKindsEnum.PL_EN}>
                  <Record
                    onStop={async (blobUrl) => {
                      const audioBlob = await fetch(blobUrl).then((r) =>
                        r.blob()
                      );
                      const sound = new File([audioBlob], "audiofile.mp3", {
                        type: "audio/mp3",
                      });
                      this.props.getTextFromSound(sound);
                    }}
                  />
                  <br />
                </div>
              </Col>
              <Col sm={8}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    onChange={this.handleLangChange.bind(this)}
                    defaultValue={this.state.fromto}
                  >
                    <option value={TranslateKindsEnum.PL_EN}>
                      Polish -{">"} English
                    </option>
                    <option value={TranslateKindsEnum.EN_PL}>
                      English -{">"} Polish
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={this.sendTranslate.bind(this)}
                  disabled={!this.state.inputText}
                >
                  Translate
                </Button>
              </Col>
            </Form.Row>
          </Col>
          <Col>
            <b>Output</b>
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
                  disabled={!this.state.inputText}
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
