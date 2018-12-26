import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';
import Text from './Text';
import Icons from '../img/symbols.svg';
import { SvgSmall } from './Icon';
import CommentSection from './CommentSection';

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

const data = [
  {
    x: '教師評價',
    y: details.teacher
  },
  {
    x: '教學效率',
    y: details.effectiveness
  },
  {
    x: '教學成效',
    y: details.usefulness
  },
  {
    x: '學生感受',
    y: details.mental
  }
];

const timeData = [
  {
    y: details.hwLength,
    x: '寫作業時間/次'
  },
  {
    y: details.testPrep,
    x: '考試準備時間/次'
  }
];

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

const totalScore = Math.floor(
  ((details.teacher +
    details.mental +
    details.effectiveness +
    details.usefulness) /
    80) *
    100
);

class CourseDetails extends Component {
  render() {
    return (
      <Container>
        <Row end mb="2.4rem" center>
          <Text lg mr="1.1rem">
            {details.course}
          </Text>
          <Text md gray mr="30px">
            {details.prof}
          </Text>
          <PureLink
            to={`/questionnaire/${details.courseId}-${details.course}-${
              details.prof
            }`}
          >
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
                    考試 <Count>{details.test}</Count> 次
                  </Text>
                </Row>
                <Row>
                  <SvgSmall h="2.3rem" w="2rem">
                    <use xlinkHref={`${Icons}#icon-files`} />
                  </SvgSmall>
                  <Text md gray ml="0.35rem">
                    作業 <Count>{details.homework}</Count> 次
                  </Text>
                </Row>
                <Row>
                  <SvgSmall h="2.3rem" w="2rem">
                    <use xlinkHref={`${Icons}#icon-presentation`} />
                  </SvgSmall>
                  <Text md gray ml="0.35rem">
                    <Count normal>{details.groupReport ? '有' : '無'}</Count>
                    團體報告
                  </Text>
                </Row>
                <Row>
                  <SvgSmall h="2.3rem" w="2rem">
                    <use xlinkHref={`${Icons}#icon-hand-stop`} />
                  </SvgSmall>
                  <Text md gray ml="0.35rem">
                    點名 <Count>{details.rollCall}</Count> 次
                  </Text>
                </Row>
              </Block>
              <Block>
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
              </Block>
            </Flex>
            <Flex>
              <Block>
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
              </Block>
              <Block>
                <Total>
                  <h1>總分</h1>
                  <Circle percent={totalScore}>
                    <InnerCircle>
                      {totalScore}
                      <span style={{ fontSize: '35px', marginBottom: '-3rem' }}>
                        %
                      </span>
                    </InnerCircle>
                  </Circle>
                </Total>
              </Block>
            </Flex>
          </div>
          <CommentSection />
        </ContentContainer>
      </Container>
    );
  }
}

export default CourseDetails;
