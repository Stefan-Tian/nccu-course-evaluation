import styled from 'styled-components';

export default styled.button`
  margin-top: 2rem;
  margin-bottom: -2rem;
  font-size: 1.7rem;
  line-height: 2.4rem;
  padding: 1rem 2.2rem;
  max-width: 18rem;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  background-color: var(--color-teal-light);
  border: 0;
  align-self: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-teal);
  }
`;
