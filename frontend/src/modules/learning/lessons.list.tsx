import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export interface ILessonsListProps extends StateProps, DispatchProps {}

class LessonsList extends Component<ILessonsListProps> {
  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    // this.props.getAllLessons(loggedInUser);
  }

  render() {
    // const { lessons } = this.props;
    return (
      <div>
        Lessons List
        {/* {lessons.map((anObjectMapped, index) => {
          return (
            <p key={`${anObjectMapped.name}`}>
              {anObjectMapped.name} - {anObjectMapped["@type"]}
            </p>
          );
        })} */}
      </div>
    );
  }
}

const mapStateToProps = () =>({ //{ lesson }: IRootState) => ({
  // lessons: lesson.lessons,
});

const mapDispatchToProps = {
  // getAllLessons,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LessonsList);
