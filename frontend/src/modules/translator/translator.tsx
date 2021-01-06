import React from "react";
import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { LanguageCodesEnum } from "../../enums/language-codes.enum";
import { TranslateKindsEnum } from "../../enums/translate-kinds.enum";
import { IRootState } from "../../store";
import { translateText } from "../../store/translate/actions";

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

  render() {
    const { output } = this.props;
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
                defaultValue={this.state.text}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Language</Form.Label>
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
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ translate }: IRootState) => ({
  output: translate.translateResponse.translatedText,
});

const mapDispatchToProps = {
  translateText,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Translator);
