import styled from 'styled-components';

export const SvgBack = styled.svg`
  fill: var(--color-teal-light);
  min-width: 8rem;
  min-height: 5rem;
  margin-left: -3.3rem;
`;

export const SvgSmall = styled.svg`
  fill: var(--color-tertiary);
  width: ${({ w }) => (w ? w : '1.9rem')};
  height: ${({ h }) => (h ? h : '1.9rem')};
  margin-right: 1rem;
`;
