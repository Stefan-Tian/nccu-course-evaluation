import styled, { css } from 'styled-components';

const Text = styled.h5`
  color: #313131;
  font-size: ${({ fs }) => fs};
  margin-bottom: ${({ mb }) => mb};
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};


  ${({ xs }) =>
    xs &&
    css`
      font-size: 12px;
    `}
  ${({ sm }) =>
    sm &&
    css`
      font-size: 16px;
    `}
  ${({ md }) =>
    md &&
    css`
      font-size: 20px;
    `}

  ${({ lg }) =>
    lg &&
    css`
      font-size: 24px;
      font-weight: 700;
    `}

  ${({ green }) =>
    green &&
    css`
      color: var(--color-secondary);
    `}

  ${({ gray }) =>
    gray &&
    css`
      color: var(--color-gray);
    `}


  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;

      &:hover {
        color: var(--color-teal);
      }
    `}
`;

export default Text;
