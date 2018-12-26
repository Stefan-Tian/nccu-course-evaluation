import styled from 'styled-components';

export default styled.div`
  border-radius: 2rem;
  padding: 4rem 6rem;
  max-width: 72rem;
  margin: 1.5rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-evenly;
  box-shadow: var(--shadow-darker);

  background-color: ${({ bg }) => (bg ? bg : '#fff')};
`;
