import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Text from './Text';
import Icons from '../img/symbols.svg';
import { SvgBack, SvgSmall } from './Icon';

const Card = styled.div`
  width: 42rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 3rem 2.5rem 0;
  box-shadow: var(--shadow);
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 3rem;
  overflow: hidden;
  transition: all 0.5s;

  &:hover {
    transform: translateY(-0.8rem);
    box-shadow: var(--shadow-hover);
    svg {
      fill: var(--color-gray-light);
    }
  }
`;

const RightCard = styled.div`
  width: 35rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const PureLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

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

const CourseCard = props => (
  <PureLink to={`courses/${props.courseId}`}>
    <Card>
      <SvgBack>
        <use xlinkHref={`${Icons}#icon-book`} />
      </SvgBack>
      <RightCard>
        <Text ml="2.2rem" lg mb="1rem">
          {props.course}
        </Text>
        <Row>
          <SvgSmall>
            <use xlinkHref={`${Icons}#icon-user`} />
          </SvgSmall>
          <Text sm gray>
            {props.prof}
          </Text>
        </Row>
        <Row>
          <SvgSmall w="2.3rem">
            <use xlinkHref={`${Icons}#icon-document-edit`} />
          </SvgSmall>
          <Text sm ml="-0.45rem" gray>
            考試 <Count>{props.test}</Count> 次
          </Text>
        </Row>
        <Row>
          <SvgSmall>
            <use xlinkHref={`${Icons}#icon-files`} />
          </SvgSmall>
          <Text sm gray>
            作業 <Count>{props.homework}</Count> 次
          </Text>
        </Row>
        <Row>
          <SvgSmall>
            <use xlinkHref={`${Icons}#icon-presentation`} />
          </SvgSmall>
          <Text sm gray>
            <Count normal>{props.groupReport ? '有' : '無'}</Count>團體報告
          </Text>
        </Row>
        <Row>
          <SvgSmall>
            <use xlinkHref={`${Icons}#icon-hand-stop`} />
          </SvgSmall>
          <Text sm gray>
            點名 <Count>{props.rollCall}</Count> 次
          </Text>
        </Row>
      </RightCard>
    </Card>
  </PureLink>
);

export default CourseCard;
