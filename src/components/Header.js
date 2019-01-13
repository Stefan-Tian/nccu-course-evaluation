import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Text from './Text';
import Aux from './Aux';
import Background from '../img/final-back.png';
import { AccountInfoConsumer } from './AccoutInfo.context';

const Hero = styled.div`
  margin-top: -10rem;
  background-color: #fff;
  background-image: url(${Background}),
    linear-gradient(
      to bottom right,
      var(--color-teal-light),
      var(--color-secondary)
    );
  background-repeat: no-repeat;
  background-position: right;
  background-size: 50%;
  padding: 10rem 2rem;
  padding-bottom: 20rem;
  -webkit-clip-path: polygon(50% 0%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
  clip-path: polygon(50% 0%, 100% 0, 100% 71%, 50% 100%, 0% 71%, 0 0);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 75%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 75%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
`;

const StyledHead = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background-color: transparent;
  z-index: 30;
  position: sticky;
  top: 0;

  ${({ detached }) =>
    detached &&
    css`
      background-color: var(--color-white);
      box-shadow: var(--shadow);
    `}
`;

const Slogan = styled.h1`
  color: #313131;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 1.88px;
  line-height: 4.9rem;
  text-align: left;
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: var(--color-teal);
`;

const PureLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const PureUrl = styled.a`
  color: inherit;
  text-decoration: none;
`;

const SloganContainer = styled.div`
  margin-left: 12rem;
  margin-top: 8rem;
  max-width: 45rem;
`;

const SubTitle = styled.span`
  display: inline-block;
  font-weight: 500;
  max-width: 45rem;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  font-size: 1.6rem;
  line-height: 1.5rem;
  color: var(--color-gray);
  letter-spacing: 1.65px;
  border-bottom: 3px solid rgba(2, 225, 109, 0.3);
  padding-bottom: -2px;
  margin-bottom: 2.4px;
`;

const RightHead = styled.div`
  display: flex;
  align-items: center;
`;

const HeadButton = styled.button`
  background-color: var(--color-teal-light);
  color: #fff;
  border: 2px solid var(--color-teal-light);
  border-radius: 4px;
  padding: 1rem 2.4rem;
  margin-right: 5.6rem;
  font-size: 1.6rem;
  font-weight: bold;
  box-shadow: var(--shadow);

  &:hover {
    background-color: #fff;
    border-color: var(--color-teal);
    color: var(--color-teal);
  }

  ${({ detached }) =>
    detached &&
    css`
      box-shadow: none;
    `}
`;

export class Head extends Component {
  state = {
    openLogin: false
  };

  onToggleLogin = () => {
    this.setState(prev => ({ openLogin: !prev.openLogin }));
  };

  render() {
    return (
      <AccountInfoConsumer>
        {({ currentAccount, clearCurrentAccount }) => (
          <Aux>
            <StyledHead detached={this.props.detached}>
              <Text md clickable>
                <PureLink to="/">選課天眼通</PureLink>
              </Text>
              <RightHead>
                <HeadButton mr="5.6rem" detached={this.props.detached}>
                  <PureLink to="/create-course">新增課程</PureLink>
                </HeadButton>
                {currentAccount ? (
                  <Text sm clickable onClick={clearCurrentAccount}>
                    登出
                  </Text>
                ) : (
                  <Text sm clickable>
                    <PureLink to="/login">登入</PureLink>
                  </Text>
                )}
              </RightHead>
            </StyledHead>
          </Aux>
        )}
      </AccountInfoConsumer>
    );
  }
}

const Header = () => (
  <Aux>
    <Hero>
      <SloganContainer>
        <Slogan>不記名、不隱藏，最真實呈現課程評價</Slogan>
        <SubTitle>選課天眼通使用區塊鏈技術保障課程評價不因過低，</SubTitle>
        <SubTitle>或任何其他原因被隱藏或竄改，保障學生權益，</SubTitle>
        <SubTitle>讓學生輕鬆查詢最真實課程評價。</SubTitle>
      </SloganContainer>
    </Hero>
  </Aux>
);

export default Header;
