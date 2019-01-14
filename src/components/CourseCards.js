import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Container from './Container';
import CourseCard from './CourseCard';
import Aux from './Aux';
import Header from './Header';
import FilterBar from './FilterBar';
import { CourseDetailsConsumer } from './CourseDetails.context';

const Flex = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 57.6rem) {
    flex-direction: column;
  }
`;

// const courses = [
//   {
//     courseId: '0001',
//     course: '微積分',
//     prof: '賴瑋婷',
//     test: 3,
//     homework: 6,
//     groupReport: true,
//     rollCall: 0,
//     hwLength: 1.5,
//     teacher: 15,
//     mental: 20,
//     effectiveness: 20,
//     usefulness: 35,
//     finalScore: 86
//   },
//   {
//     id: '0002',
//     course: '個體經濟學',
//     prof: '陳鎮洲',
//     test: 4,
//     homework: 2,
//     groupReport: false,
//     rollCall: 3
//   },
//   {
//     course: '經濟學',
//     prof: '王信實',
//     test: 6,
//     homework: 2,
//     groupReport: true,
//     rollCall: 1
//   },
//   {
//     course: '財政學',
//     prof: '陳國良',
//     test: 2,
//     homework: 6,
//     groupReport: true,
//     rollCall: 2
//   },
//   {
//     course: '商事法',
//     prof: '方佳霖',
//     test: 2,
//     homework: 1,
//     groupReport: false,
//     rollCall: 10
//   },
//   {
//     course: '英語口語訓練',
//     prof: '林琬瑜',
//     test: 5,
//     homework: 2,
//     groupReport: true,
//     rollCall: 0
//   },
//   {
//     course: '中級日語',
//     prof: '許清捐',
//     test: 3,
//     homework: 6,
//     groupReport: false,
//     rollCall: 2
//   },
//   {
//     course: '國文',
//     prof: '張慧貞',
//     test: 3,
//     homework: 2,
//     groupReport: false,
//     rollCall: 4
//   },
//   {
//     course: '美國運動史',
//     prof: '周一騰',
//     test: 5,
//     homework: 6,
//     groupReport: false,
//     rollCall: 1
//   },
//   {
//     course: '統計學',
//     prof: '郭濬智',
//     test: 4,
//     homework: 2,
//     groupReport: true,
//     rollCall: 8
//   },
//   {
//     course: '財務管理',
//     prof: '屠沒雅',
//     test: 3,
//     homework: 3,
//     groupReport: true,
//     rollCall: 3
//   },
//   {
//     course: '近代物理學',
//     prof: '琳於境',
//     test: 1,
//     homework: 10,
//     groupReport: false,
//     rollCall: 2
//   },
//   {
//     course: '法文',
//     prof: '古拉爵',
//     test: 5,
//     homework: 8,
//     groupReport: true,
//     rollCall: 3
//   },
//   {
//     course: '西班牙文',
//     prof: 'Jose',
//     test: 1,
//     homework: 6,
//     groupReport: false,
//     rollCall: 4
//   },
//   {
//     course: '初級瑜伽',
//     prof: '楊麗環',
//     test: 3,
//     homework: 6,
//     groupReport: true,
//     rollCall: 0
//   }
// ];

class CourseCards extends Component {
  state = {
    keyword: '',
    sortBy: ''
  };

  async componentDidMount() {
    const result = await axios.post('http://localhost:9999/getClassIndex', {
      index: 0
    });

    const chainLength = parseInt(result.data[0]);
    const contextLength = parseInt(this.props.context.courses.length);

    if (chainLength <= contextLength) {
      return;
    }

    // result.data[0] is the length of courses
    this.props.context.cleanCourses();
    for (let i = 0; i < chainLength; i++) {
      let courseObj = {};
      const idData = await axios.post('http://localhost:9999/getClassIndex', {
        index: i
      });
      const classId = idData.data[1];
      const courseInfoPart1 = await axios.post(
        'http://localhost:9999/getDataFromClassId',
        {
          classId
        }
      );
      const courseInfoPart2 = await axios.post(
        'http://localhost:9999/getDataFromClassIdPart2',
        {
          classId
        }
      );

      const count = parseInt(courseInfoPart2.data[4]);
      const homework =
        Math.round((parseInt(courseInfoPart1.data[2]) / count) * 2.5) || 0;
      const hwLength =
        Math.round((parseInt(courseInfoPart1.data[3]) / count) * 2.5) || 0;
      const test =
        Math.round((parseInt(courseInfoPart1.data[4]) / count) * 2.5) || 0;
      const testPrep =
        Math.round((parseInt(courseInfoPart1.data[5]) / count) * 2.5) || 0;
      const groupProject =
        Math.round((parseInt(courseInfoPart1.data[6]) / count) * 2.5) || 0;
      const rollCall =
        Math.round((parseInt(courseInfoPart1.data[7]) / count) * 2.5) || 0;
      const finalScore =
        Math.round((parseInt(courseInfoPart1.data[8]) / count) * 2.5) || 0;
      const teacher = parseInt(courseInfoPart2.data[0]) / count || 0;
      const usefulness = parseInt(courseInfoPart2.data[1]) / count || 0;
      const effectiveness = parseInt(courseInfoPart2.data[2]) / count || 0;
      const mental = parseInt(courseInfoPart2.data[3]) / count || 0;

      courseObj = {
        courseId: classId,
        course: courseInfoPart1.data[0],
        prof: courseInfoPart1.data[1],
        homework,
        hwLength,
        test,
        testPrep,
        groupProject,
        rollCall,
        usefulness,
        teacher,
        effectiveness,
        mental,
        finalScore,
        count
      };

      this.props.context.updateCourses(courseObj);
    }
  }

  applyFilter = (keyword, sortBy) => {
    keyword.toLowerCase();

    let filtered = this.props.context.courses.filter(
      ({ course, prof }) => course.includes(keyword) || prof.includes(keyword)
    );

    switch (sortBy) {
      case 'test':
        return filtered.filter(({ test }) => test <= 3);
      case 'homework':
        return filtered.filter(({ homework }) => homework <= 3);
      case 'rollCall':
        return filtered.filter(({ rollCall }) => rollCall <= 3);
      case 'groupReport':
        return filtered.filter(({ groupReport }) => groupReport === false);
      default:
        return filtered;
    }
  };

  changeKeyword = e => this.setState({ keyword: e.target.value });
  switchSortBy = item => this.setState({ sortBy: item });

  render() {
    return this.props.context.courses ? (
      <Aux>
        <Header />
        <FilterBar
          changeKeyword={this.changeKeyword}
          keyword={this.state.keyword}
          switchSortBy={this.switchSortBy}
        />
        <Container>
          <Flex>
            {this.applyFilter(this.state.keyword, this.state.sortBy).map(
              (
                {
                  courseId,
                  course,
                  prof,
                  test,
                  homework,
                  groupReport,
                  rollCall
                },
                idx
              ) => {
                let bg;
                if (idx % 2 === 0) {
                  bg = `var(--color-alert)`;
                } else if (idx % 3 === 0) {
                  bg = `var(--color-neutral)`;
                }
                return (
                  <CourseCard
                    key={course + prof + idx}
                    courseId={courseId}
                    bg={bg}
                    course={course}
                    prof={prof}
                    test={test}
                    homework={homework}
                    groupReport={groupReport}
                    rollCall={rollCall}
                  />
                );
              }
            )}
          </Flex>
        </Container>
      </Aux>
    ) : (
      <div>Wait..</div>
    );
  }
}

const MapCourseCards = props => (
  <CourseDetailsConsumer>
    {context => <CourseCards context={context} {...props} />}
  </CourseDetailsConsumer>
);

export default MapCourseCards;
