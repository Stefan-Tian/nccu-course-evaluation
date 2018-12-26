import React, { Component } from 'react';
import styled from 'styled-components';
import Container from './Container';
import CourseCard from './CourseCard';
import Aux from './Aux';
import Header from './Header';
import FilterBar from './FilterBar';

const Flex = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 57.6rem) {
    flex-direction: column;
  }
`;

const courses = [
  {
    courseId: '0001',
    course: '微積分',
    prof: '賴瑋婷',
    test: 3,
    homework: 6,
    groupReport: true,
    rollCall: 0,
    hwLength: 1.5,
    teacher: 15,
    mental: 20,
    effectiveness: 20,
    usefulness: 35,
    finalScore: 86
  },
  {
    id: '0002',
    course: '個體經濟學',
    prof: '陳鎮洲',
    test: 4,
    homework: 2,
    groupReport: false,
    rollCall: 3
  },
  {
    course: '經濟學',
    prof: '王信實',
    test: 6,
    homework: 2,
    groupReport: true,
    rollCall: 1
  },
  {
    course: '財政學',
    prof: '陳國良',
    test: 2,
    homework: 6,
    groupReport: true,
    rollCall: 2
  },
  {
    course: '商事法',
    prof: '方佳霖',
    test: 2,
    homework: 1,
    groupReport: false,
    rollCall: 10
  },
  {
    course: '英語口語訓練',
    prof: '林琬瑜',
    test: 5,
    homework: 2,
    groupReport: true,
    rollCall: 0
  },
  {
    course: '中級日語',
    prof: '許清捐',
    test: 3,
    homework: 6,
    groupReport: false,
    rollCall: 2
  },
  {
    course: '國文',
    prof: '張慧貞',
    test: 3,
    homework: 2,
    groupReport: false,
    rollCall: 4
  },
  {
    course: '美國運動史',
    prof: '周一騰',
    test: 5,
    homework: 6,
    groupReport: false,
    rollCall: 1
  },
  {
    course: '統計學',
    prof: '郭濬智',
    test: 4,
    homework: 2,
    groupReport: true,
    rollCall: 8
  },
  {
    course: '財務管理',
    prof: '屠沒雅',
    test: 3,
    homework: 3,
    groupReport: true,
    rollCall: 3
  },
  {
    course: '近代物理學',
    prof: '琳於境',
    test: 1,
    homework: 10,
    groupReport: false,
    rollCall: 2
  },
  {
    course: '法文',
    prof: '古拉爵',
    test: 5,
    homework: 8,
    groupReport: true,
    rollCall: 3
  },
  {
    course: '西班牙文',
    prof: 'Jose',
    test: 1,
    homework: 6,
    groupReport: false,
    rollCall: 4
  },
  {
    course: '初級瑜伽',
    prof: '楊麗環',
    test: 3,
    homework: 6,
    groupReport: true,
    rollCall: 0
  }
];

class CourseCards extends Component {
  state = {
    keyword: '',
    sortBy: ''
  };

  applyFilter = (keyword, sortBy) => {
    keyword.toLowerCase();

    let filtered = courses.filter(
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
    return (
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
    );
  }
}

export default CourseCards;
