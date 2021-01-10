import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { IPupilInfo } from "../../models/pupil-info.model";

export interface IAssignExerciseProps {
  pupils: IPupilInfo[];
  id: number;
  saveAssignation;
}
class AssignExercise extends Component<IAssignExerciseProps> {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  componentDidMount() {
    const { pupils } = this.props;
    this.setState({
      selectedOption: this.getDefaultSelectedPupils(pupils),
    });
  }

  handleSave() {
    const { selectedOption } = this.state;
    const { id, saveAssignation } = this.props;
    let names = selectedOption
      ? selectedOption.map((option) => option.value)
      : [];
    saveAssignation(id, names);
  }

  getPupilLabels = (pupils: IPupilInfo[]) => {
    let names = [];
    if (pupils) {
      names = pupils.map((pupil) => {
        return {
          value: pupil.pupilName,
          label: pupil.pupilName,
        };
      });
    }
    return names;
  };

  getDefaultSelectedPupils = (pupils: IPupilInfo[]) => {
    let selectedPupils = pupils.filter((pupil) => pupil.assigned);
    return this.getPupilLabels(selectedPupils);
  };

  render() {
    const { selectedOption } = this.state;
    const { pupils } = this.props;
    return (
      <Row>
        <Col md={10}>
          {pupils ? (
            <Select
              isMulti
              value={selectedOption}
              onChange={this.handleChange}
              options={this.getPupilLabels(pupils)}
            />
          ) : null}
        </Col>
        <Col md={2}>
          <Button variant="info" onClick={() => this.handleSave()}>
            <FontAwesomeIcon className="text-white" icon={faSave} />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default AssignExercise;
