import React, { Component } from 'react';

const CourseDetails = React.createContext();

export class CourseDetailsProvider extends Component {
  state = {
    courses: []
  };

  updateCourses = newCourse => {
    const updatedCourses = [...this.state.courses];
    updatedCourses.push(newCourse);
    this.setState({ courses: updatedCourses });
  };

  cleanCourses = () => this.setState({ courses: [] });

  render() {
    return (
      <CourseDetails.Provider
        value={{
          courses: this.state.courses,
          updateCourses: this.updateCourses,
          cleanCourses: this.cleanCourses
        }}
      >
        {this.props.children}
      </CourseDetails.Provider>
    );
  }
}

export const CourseDetailsConsumer = CourseDetails.Consumer;
