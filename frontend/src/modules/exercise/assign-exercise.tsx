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

  styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
  };

  orderOptions(values) {
    return values
      ? values.filter((v) => v.isFixed).concat(values.filter((v) => !v.isFixed))
      : [];
  }

  onChange(selectedOption, { action, removedValue }) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        selectedOption = this.getPupilLabels(this.props.pupils).filter(
          (v) => v.isFixed
        );
        break;
    }

    selectedOption = this.orderOptions(selectedOption);
    this.setState({ selectedOption: selectedOption });
  }

  componentDidMount() {
    const { pupils } = this.props;
    this.setState({
      selectedOption: this.orderOptions(this.getDefaultSelectedPupils(pupils)),
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
          isFixed: pupil.solved,
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
              styles={this.styles}
              isMulti
              value={selectedOption}
              onChange={this.onChange.bind(this)}
              options={this.getPupilLabels(pupils)}
              isClearable={
                selectedOption && selectedOption.some((v) => !v.isFixed)
              }
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
