import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';
import Text from './Text';
import Icons from '../img/symbols.svg';
import { SvgSmall } from './Icon';
import CommentSection from './CommentSection';
import Aux from './Aux';
import PasswordConfirmation from './PasswordConfirmation';
import { ModalBack, CloseModal } from './Modal';
import { AccountInfoConsumer } from './AccoutInfo.context';
import { CourseDetailsConsumer } from './CourseDetails.context';

const details = {
  courseId: '0001',
  course: '微積分',
  prof: '賴瑋婷',
  test: 3,
  homework: 6,
  groupReport: true,
  rollCall: 0,
  hwLength: 1.5,
  testPrep: 3,
  teacher: 15,
  mental: 20,
  effectiveness: 18,
  usefulness: 12,
  finalScore: 86
};

const Count = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-teal);

  ${({ normal }) =>
    normal &&
    css`
      font-size: inherit;
    `}
`;

const Total = styled.div`
  min-width: 30rem;
  min-height: 30rem;
`;

const PureLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.6rem;
  transform: translateY(-3px);
  font-weight: 800;
  font-style: italic;
  border-bottom: 3.5px solid var(--color-teal-light);
  line-height: 1.58rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  max-width: 70rem;
`;

const Container = styled.div`
  max-width: 99.2rem;
  padding: 2rem;
  margin: 2rem auto 0 auto;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Block = styled.div`
  min-width: 30rem;
  max-width: 30rem;
  min-height: 30rem;
  max-height: 30rem;
  padding: 3rem;
  background-color: #fff;
  box-shadow: var(--shadow);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-right: 2rem;
`;

const Circle = styled.div`
  display: flex;
  transform: translateY(-2rem);
  align-items: center;
  justify-content: center;
  min-width: 23rem;
  max-width: 23rem;
  min-height: 23rem;
  border-radius: 50%;
  background: ${({ percent }) =>
    percent
      ? `linear-gradient(
          to top,
          var(--color-teal-light),
          var(--color-teal-light) ${percent}%,
          var(--color-secondary)
        );`
      : `linear-gradient(
          to top right,
          var(--color-secondary),
          var(--color-teal-light)
        );`};
`;

const InnerCircle = styled.div`
  font-size: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 14rem;
  max-width: 14rem;
  min-height: 14rem;
  background-color: #fff;
  border-radius: 50%;
  padding-bottom: 1.9rem;
  padding-left: 1.5rem;
`;

const BlankContainer = styled.div`
  background-color: #e8e8e8;
  min-width: 24rem;
  max-width: 24rem;
  min-height: 24rem;
  max-height: 24rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Blank = styled.div`
  font-size: 2.8rem;
  color: #787878;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ mb }) => mb};
  margin-right: ${({ mr }) => mr};

  ${({ center }) =>
    center &&
    css`
      justify-content: center;
    `}

  ${({ end }) =>
    end &&
    css`
      align-items: flex-end;
    `}
`;

class CourseDetails extends Component {
  async componentDidMount() {
    const classId = this.props.match.params.id;
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
    const courseObj = {
      courseId: classId,
      course: courseInfoPart1.data[0],
      prof: courseInfoPart1.data[1],
      homework: courseInfoPart1.data[2],
      hwLength: courseInfoPart1.data[3],
      test: courseInfoPart1.data[4],
      testPrep: courseInfoPart1.data[5],
      groupProject: courseInfoPart1.data[6],
      rollCall: courseInfoPart1.data[7],
      finalScore: courseInfoPart1.data[8],
      teacher: courseInfoPart2.data[0],
      usefulness: courseInfoPart2.data[1],
      effectiveness: courseInfoPart2.data[2],
      mental: courseInfoPart2.data[3],
      count: courseInfoPart2.data[4]
    };

    this.setState({ course: courseObj });
  }

  state = {
    password: '',
    enterPassword: false,
    comment: '',
    response: '',
    submitInfo: '',
    course: {}
  };

  handleSubmitComment = async (account, password, comment) => {
    const result = await axios.post(
      'http://localhost:9999/addNameClassComment',
      {
        account,
        password,
        comment
      }
    );
    console.log(result);
  };

  handleSubmitVote = async (account, password, response) => {
    const result = await axios.post('http://localhost:9999//addVoteToComment', {
      account,
      password,
      response
    });

    console.log(result);
  };

  onPasswordChange = e => this.setState({ password: e.target.value });
  onEnterPassword = () => this.setState({ enterPassword: true });

  onPasswordConfirm = () => {
    const { currentAccount } = this.props.accountContext;
    if (this.state.submitInfo === 'comment') {
      const { password, comment } = this.state;
      this.handleSubmitComment(currentAccount, password, comment);
    } else if (this.state.submitInfo === 'vote') {
      const { password, response } = this.state;
      this.handleSubmitVote(currentAccount, password, response);
    }
    this.setState({ enterPassword: false });
  };

  onCommentChange = e => this.setState({ comment: e.target.value });

  onSubmitComment = () => {
    this.setState({ submitInfo: 'comment', enterPassword: true });
  };

  onUpvote = () => {
    this.setState({ submitInfo: 'vote', response: 1, enterPassword: true });
  };

  onDownvote = () => {
    this.setState({ submitInfo: 'vote', response: -1, enterPassword: true });
  };

  render() {
    const {
      course,
      prof,
      test,
      homework,
      courseId,
      groupReport,
      rollCall,
      teacher,
      usefulness,
      effectiveness,
      mental,
      testPrep,
      hwLength
    } = this.state.course;
    const data = [
      {
        x: '教師評價',
        y: teacher
      },
      {
        x: '教學效率',
        y: effectiveness
      },
      {
        x: '教學成效',
        y: usefulness
      },
      {
        x: '學生感受',
        y: mental
      }
    ];

    const timeData = [
      {
        y: hwLength,
        x: '寫作業時間/次'
      },
      {
        y: testPrep,
        x: '考試準備時間/次'
      }
    ];

    const totalScore = Math.floor(
      ((teacher + mental + effectiveness + usefulness) / 80) * 100
    );

    return teacher ? (
      <Aux>
        <Container>
          <Row end mb="2.4rem" center>
            <Text lg mr="1.1rem">
              {course}
            </Text>
            <Text md gray mr="30px">
              {prof}
            </Text>
            <PureLink to={`/questionnaire/${courseId}-${course}-${prof}`}>
              填寫課程問卷
            </PureLink>
          </Row>
          <ContentContainer>
            <div>
              <Flex>
                <Block>
                  <Row>
                    <SvgSmall h="2.3rem" w="2.3rem">
                      <use xlinkHref={`${Icons}#icon-document-edit`} />
                    </SvgSmall>
                    <Text md gray>
                      考試 <Count>{test}</Count> 次
                    </Text>
                  </Row>
                  <Row>
                    <SvgSmall h="2.3rem" w="2rem">
                      <use xlinkHref={`${Icons}#icon-files`} />
                    </SvgSmall>
                    <Text md gray ml="0.35rem">
                      作業 <Count>{homework}</Count> 次
                    </Text>
                  </Row>
                  <Row>
                    <SvgSmall h="2.3rem" w="2rem">
                      <use xlinkHref={`${Icons}#icon-presentation`} />
                    </SvgSmall>
                    <Text md gray ml="0.35rem">
                      <Count normal>{groupReport ? '有' : '無'}</Count>
                      團體報告
                    </Text>
                  </Row>
                  <Row>
                    <SvgSmall h="2.3rem" w="2rem">
                      <use xlinkHref={`${Icons}#icon-hand-stop`} />
                    </SvgSmall>
                    <Text md gray ml="0.35rem">
                      點名 <Count>{rollCall}</Count> 次
                    </Text>
                  </Row>
                </Block>
                <Block>
                  {totalScore === 0 ? (
                    <BlankContainer>
                      <Blank>尚無回覆</Blank>
                    </BlankContainer>
                  ) : (
                    <XYPlot width={250} height={250} xType="ordinal">
                      <VerticalBarSeries
                        data={timeData}
                        color="#3cd3d3"
                        barWidth="0.6"
                      />
                      <XAxis
                        style={{
                          text: {
                            stroke: 'none',
                            fill: '#535252',
                            fontWeight: 500,
                            fontSize: '12px'
                          },
                          line: { stroke: 'none' }
                        }}
                      />
                      <YAxis
                        style={{
                          text: {
                            stroke: 'none',
                            fill: '#535252',
                            fontWeight: 500,
                            fontSize: '12px'
                          },
                          line: { stroke: 'none' }
                        }}
                      />
                    </XYPlot>
                  )}
                </Block>
              </Flex>
              <Flex>
                <Block>
                  {totalScore === 0 ? (
                    <BlankContainer>
                      <Blank>尚無回覆</Blank>
                    </BlankContainer>
                  ) : (
                    <XYPlot width={250} height={250} xType="ordinal">
                      <VerticalBarSeries data={data} color="#3cd3d3" />
                      <XAxis
                        style={{
                          text: {
                            stroke: 'none',
                            fill: '#535252',
                            fontWeight: 500,
                            fontSize: '12px'
                          },
                          line: { stroke: 'none' }
                        }}
                      />
                      <YAxis
                        style={{
                          text: {
                            stroke: 'none',
                            fill: '#535252',
                            fontWeight: 500,
                            fontSize: '12px'
                          },
                          line: { stroke: 'none' }
                        }}
                      />
                    </XYPlot>
                  )}
                </Block>
                <Block>
                  <Total>
                    <h1>總分</h1>
                    <Circle percent={totalScore}>
                      <InnerCircle>
                        {totalScore}
                        <span
                          style={{ fontSize: '35px', marginBottom: '-3rem' }}
                        >
                          %
                        </span>
                      </InnerCircle>
                    </Circle>
                  </Total>
                </Block>
              </Flex>
            </div>
            <CommentSection
              comment={this.state.comment}
              onCommentChange={this.onCommentChange}
              onSubmitComment={this.onSubmitComment}
              onUpvote={this.onUpvote}
              onDownvote={this.onDownvote}
            />
          </ContentContainer>
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
    ) : (
      <div>Wait...</div>
    );
  }
}

const MapCourseDetails = props => (
  <AccountInfoConsumer>
    {accountContext => (
      <CourseDetailsConsumer>
        {courseContext => (
          <CourseDetails
            accountContext={accountContext}
            courseContext={courseContext}
            {...props}
          />
        )}
      </CourseDetailsConsumer>
    )}
  </AccountInfoConsumer>
);

export default MapCourseDetails;
