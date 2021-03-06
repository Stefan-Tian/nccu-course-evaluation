import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card';
import Aux from './Aux';
import Title, { Subtitle } from './Title';
import { List, ListItem, FixedListItem, LeftList, RightList } from './List';
import RadioGroup, { RadioInputFix } from './RadioGroup';
import Button from './Button';
import { CloseModal, ModalBack } from './Modal';
import PasswordConfirmation from './PasswordConfirmation';
import { AccountInfoConsumer } from './AccoutInfo.context';

//  REMEMBER TO ADD COURSE_ID, TEACHER_NAME, CLASS_NAME
// IN THE DATA AND SEND THEM TO BACKEND

const subjectiveQuestions = [
  '老師脾氣很差',
  '老師樂於解答學生問題',
  '老師尊重學生意見',
  '老師善於表達教學內容',
  '本課程對我目前或後續學習有幫助',
  '本課程無法在課堂外應用',
  '本課程對我目前或未來工作有幫助',
  '本課程讓我獲益良多',
  '我能跟上課程進度',
  '我在考試後仍記得我學了什麼',
  '我不知道這堂課在教什麼',
  '我想學更深入本課程相關領域',
  '這堂課讓我焦慮',
  '這堂課要求太多',
  '我喜歡上這堂課',
  '我會推薦同學上這堂課'
];

const Scale = styled.div`
  display: flex;
  align-items: center;
`;

const ScaleItem = styled.div`
  &:not(:last-of-type) {
    margin-right: 4.3rem;
  }
`;

const Container = styled.div`
  margin-top: 5rem;
  color: #313131;
`;

const SelectContainer = styled.div`
  position: relative;

  & select {
    /* display: none; */
  }
`;

const Select = styled.select`
  margin-right: 0.5rem;
  min-width: 7rem;
  max-width: 7rem;
  background-color: var(--color-secondary);
  font-size: 1.2rem;
  font-weight: 500;
  border: 0;
  outline: none;
`;

class Questionnaire extends Component {
  state = {
    password: '',
    enterPassword: '',
    homework: 1,
    hwLength: 1,
    test: 1,
    testPrep: 1,
    groupProject: 0,
    rollCall: 1,
    finalScore: 1,
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question8: '',
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question13: '',
    question14: '',
    question15: '',
    question16: '',
    error: ''
  };

  onPasswordChange = e => this.setState({ password: e.target.value });
  onEnterPassword = () => this.setState({ enterPassword: true });

  onHomeworkChange = e => this.setState({ homework: e.target.value });
  onHwLengthChange = e => this.setState({ hwLength: e.target.value });
  onTestChange = e => this.setState({ test: e.target.value });
  onTestPrepChange = e => this.setState({ testPrep: e.target.value });
  onRollCallChange = e => this.setState({ rollCall: e.target.value });
  onFinalScoreChange = e => this.setState({ finalScore: e.target.value });

  onQuestion1Change = e =>
    this.setState({ question1: 6 - parseInt(e.target.value) });
  onQuestion2Change = e =>
    this.setState({ question2: parseInt(e.target.value) });
  onQuestion3Change = e =>
    this.setState({ question3: parseInt(e.target.value) });
  onQuestion4Change = e =>
    this.setState({ question4: parseInt(e.target.value) });
  onQuestion5Change = e =>
    this.setState({ question5: parseInt(e.target.value) });
  onQuestion6Change = e =>
    this.setState({ question6: 6 - parseInt(e.target.value) });
  onQuestion7Change = e =>
    this.setState({ question7: parseInt(e.target.value) });
  onQuestion8Change = e =>
    this.setState({ question8: parseInt(e.target.value) });
  onQuestion9Change = e =>
    this.setState({ question9: parseInt(e.target.value) });
  onQuestion10Change = e =>
    this.setState({ question10: parseInt(e.target.value) });
  onQuestion11Change = e =>
    this.setState({ question11: 6 - parseInt(e.target.value) });
  onQuestion12Change = e =>
    this.setState({ question12: parseInt(e.target.value) });
  onQuestion13Change = e =>
    this.setState({ question13: 6 - parseInt(e.target.value) });
  onQuestion14Change = e =>
    this.setState({ question14: 6 - parseInt(e.target.value) });
  onQuestion15Change = e =>
    this.setState({ question15: parseInt(e.target.value) });
  onQuestion16Change = e =>
    this.setState({ question16: parseInt(e.target.value) });

  handleSubmit = async (account, password) => {
    let {
      homework,
      hwLength,
      test,
      testPrep,
      groupProject,
      rollCall,
      finalScore,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
      question11,
      question12,
      question13,
      question14,
      question15,
      question16
    } = this.state;

    homework = parseInt(homework);
    hwLength = parseInt(hwLength);
    test = parseInt(test);
    testPrep = parseInt(testPrep);
    groupProject = parseInt(groupProject);
    rollCall = parseInt(rollCall);
    finalScore = parseInt(finalScore);

    const [id, className, teacherName] = this.props.match.params.id.split('-');
    homework = parseInt(homework);
    hwLength = parseInt(hwLength);
    test = parseInt(test);
    testPrep = parseInt(testPrep);
    rollCall = parseInt(rollCall);
    finalScore = parseInt(finalScore);

    if (
      homework === '' ||
      hwLength === '' ||
      test === '' ||
      testPrep === '' ||
      rollCall === '' ||
      finalScore === '' ||
      homework === '' ||
      hwLength === '' ||
      question1 === '' ||
      question2 === '' ||
      question3 === '' ||
      question4 === '' ||
      question5 === '' ||
      question6 === '' ||
      question7 === '' ||
      question8 === '' ||
      question9 === '' ||
      question10 === '' ||
      question11 === '' ||
      question12 === '' ||
      question13 === '' ||
      question14 === '' ||
      question15 === '' ||
      question16 === ''
    ) {
      this.setState({ error: '每個欄位都要填' });
      return alert(this.state.error);
    }
    const teacher = question1 + question2 + question3 + question4;
    const usefulness = question5 + question6 + question7 + question8;
    const effectiveness = question9 + question10 + question11 + question12;
    const mental = question13 + question14 + question15 + question16;

    const result = await axios.post('http://localhost:9999/addNameClassValue', {
      account,
      password,
      classId: id,
      homework,
      hwLength,
      test,
      testPrep,
      groupProject,
      rollCall,
      finalScore,
      teacher,
      usefulness,
      effectiveness,
      mental
    });

    console.log(result);
  };

  onPasswordConfirm = () => {
    const { currentAccount } = this.props.context;
    const { password } = this.state;
    this.handleSubmit(currentAccount, password);
    this.setState({ enterPassword: false });
    this.props.history.push('/');
  };

  render() {
    const questionHandlers = [
      this.onQuestion1Change,
      this.onQuestion2Change,
      this.onQuestion3Change,
      this.onQuestion4Change,
      this.onQuestion5Change,
      this.onQuestion6Change,
      this.onQuestion7Change,
      this.onQuestion8Change,
      this.onQuestion9Change,
      this.onQuestion10Change,
      this.onQuestion11Change,
      this.onQuestion12Change,
      this.onQuestion13Change,
      this.onQuestion14Change,
      this.onQuestion15Change,
      this.onQuestion16Change
    ];

    return (
      <Aux>
        <Container>
          <Card>
            <Title>客觀問題</Title>
            <List mb="4rem">
              <FixedListItem>
                <LeftList>1. 請問此課程有幾次作業</LeftList>
                {/* <div>
                <NumInput
                  type="number"
                  value={homework}
                  onChange={e => this.setState({ homework: e.target.value })}
                />{' '}
                次 
              </div> */}
                <SelectContainer>
                  <Select onChange={this.onHomeworkChange}>
                    <option value={1}>0-3</option>
                    <option value={2}>4-6</option>
                    <option value={3}>7-9</option>
                    <option value={4}>10-12</option>
                    <option value={5}>13-15</option>
                    <option value={6}>多於15</option>
                  </Select>
                  次
                </SelectContainer>
              </FixedListItem>
              <FixedListItem>
                <LeftList>2. 請問您平均每份作業完成時間</LeftList>
                <SelectContainer>
                  <Select onChange={this.onHwLengthChange}>
                    <option value={1}>0-3</option>
                    <option value={2}>4-6</option>
                    <option value={3}>7-9</option>
                    <option value={4}>10-12</option>
                    <option value={5}>13-15</option>
                    <option value={6}>多於15</option>
                  </Select>
                  小時
                </SelectContainer>
              </FixedListItem>
              <FixedListItem>
                <LeftList>3. 請問此課程包含小考共有幾次考試</LeftList>
                <SelectContainer>
                  <Select onChange={this.onTestChange}>
                    <option value={1}>0-3</option>
                    <option value={2}>4-6</option>
                    <option value={3}>7-9</option>
                    <option value={4}>10-12</option>
                    <option value={5}>13-15</option>
                    <option value={6}>多於15</option>
                  </Select>
                  次
                </SelectContainer>
              </FixedListItem>
              <FixedListItem>
                <LeftList>4. 請問您平均每次考試準備時間</LeftList>
                <SelectContainer>
                  <Select onChange={this.onTestPrepChange}>
                    <option value={1}>0-3</option>
                    <option value={2}>4-6</option>
                    <option value={3}>7-9</option>
                    <option value={4}>10-12</option>
                    <option value={5}>13-15</option>
                    <option value={6}>多於15</option>
                  </Select>
                  小時
                </SelectContainer>
              </FixedListItem>
              <FixedListItem>
                <LeftList>5. 請問此課程是否需要分組做作業或報告</LeftList>
                <RightList>
                  <label>
                    <RadioInputFix
                      name="groupProject"
                      value={true}
                      type="radio"
                      onChange={() => this.setState({ groupProject: 1 })}
                    />{' '}
                    有
                  </label>
                  <label>
                    <RadioInputFix
                      name="groupProject"
                      value={false}
                      type="radio"
                      onChange={() => this.setState({ groupProject: 0 })}
                    />{' '}
                    無
                  </label>
                </RightList>
              </FixedListItem>
              <FixedListItem>
                <LeftList>6. 請問此課程一學期點名幾次</LeftList>
                <SelectContainer>
                  <Select onChange={this.onRollCallChange}>
                    <option value={1}>0-3</option>
                    <option value={2}>4-6</option>
                    <option value={3}>7-9</option>
                    <option value={4}>10-12</option>
                    <option value={5}>13-15</option>
                    <option value={6}>多於15</option>
                  </Select>
                  次
                </SelectContainer>
              </FixedListItem>
              <FixedListItem>
                <LeftList>7. 請問您本課程期末總成績</LeftList>
                <SelectContainer>
                  <Select onChange={this.onFinalScoreChange}>
                    <option value={1}>低於60</option>
                    <option value={2}>60-69</option>
                    <option value={3}>70-79</option>
                    <option value={4}>80-89</option>
                    <option value={5}>90-99</option>
                  </Select>
                  分
                </SelectContainer>
              </FixedListItem>
            </List>
            <Title>
              <div>
                主觀問題 - <Subtitle>1分非常不同意; 5分非常同意</Subtitle>
              </div>
              <Scale>
                {Array.apply(null, { length: 5 })
                  .map(Number.call, Number)
                  .map(idx => (
                    <ScaleItem key={idx + 'scaleItem'}>{idx + 1}</ScaleItem>
                  ))}
              </Scale>
            </Title>
            <List>
              {subjectiveQuestions.map((question, idx) => (
                <ListItem key={question}>
                  <div>
                    {idx + 1}. {question}
                  </div>
                  <RadioGroup
                    num={idx + 1}
                    onRadioChange={questionHandlers[idx]}
                  />
                </ListItem>
              ))}
            </List>
            <Button onClick={this.onEnterPassword}>提交表單</Button>
          </Card>
        </Container>
        {this.state.enterPassword ? (
          <ModalBack>
            <CloseModal onClick={() => this.setState({ enterPassword: false })}>
              x
            </CloseModal>
            <PasswordConfirmation
              password={this.state.password}
              onPasswordChange={this.onPasswordChange}
              onPasswordConfirm={this.onPasswordConfirm}
            />
          </ModalBack>
        ) : null}
      </Aux>
    );
  }
}

const MapQuestionnaire = props => (
  <AccountInfoConsumer>
    {context => <Questionnaire context={context} {...props} />}
  </AccountInfoConsumer>
);
export default MapQuestionnaire;
