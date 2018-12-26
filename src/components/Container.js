import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 120rem;
  padding: 1.2rem 1rem;
  margin: 0 auto;
  padding: 1.2rem 0.5rem;

  @media (max-width: 99.2rem) {
    max-width: 99rem;
    padding: 1.2rem 1rem;
  }

  @media (max-width: 76.8rem) {
    max-width: 76rem;
    padding: 1.2rem 1rem;
  }
`;
const Container = props => <StyledContainer>{props.children}</StyledContainer>;

export default Container;
