import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Text from './Text';
import Button from './Button';

const StyledCard = styled(Card)`
  margin-top: 8rem;
  max-width: 50rem;
  padding-top: 3rem 1rem 1rem 2rem;
`;

const Input = styled.input`
  border: 0;
  background-color: var(--color-gray-light-2);
  padding: 1rem;
  font-size: 1.8rem;
  line-height: 2.4rem;
  border-radius: 4px;
  margin-bottom: 3.6rem;
  font-weight: bold;

  &::placeholder {
    color: var(--color-gray-light);
  }
`;

class CreateCourse extends Component {
  state = {
    courseId: '',
    courseName: '',
    courseInstructor: ''
  };

  render() {
    const { courseId, courseName, courseInstructor } = this.state;
    return (
      <StyledCard>
        <Text lg mb="3rem" style={{ textAlign: 'center' }}>
          新增課程
        </Text>
        <Text md mb="0.5rem">
          課程代碼
        </Text>
        <Input
          placeholder="211011"
          value={courseId}
          onChange={e => this.setState({ courseId: e.target.value })}
        />
        <Text md mb="0.5rem">
          課程名稱
        </Text>

        <Input
          placeholder="經濟學"
          value={courseName}
          onChange={e => this.setState({ courseName: e.target.value })}
        />
        <Text md mb="0.5rem">
          授課老師
        </Text>
        <Input
          placeholder="陳心蘋"
          value={courseInstructor}
          onChange={e => this.setState({ courseInstructor: e.target.value })}
        />
        <Button>確認送出</Button>
      </StyledCard>
    );
  }
}

export default CreateCourse;
