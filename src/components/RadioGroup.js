import React from 'react';
import styled from 'styled-components';

export const RadioContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RadioInput = styled.input`
  &:not(:last-of-type) {
    margin-right: 4rem;
  }

  &[type='radio'] {
    opacity: 1;

    &:before {
      content: '';
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #989898;
      visibility: visible;
      position: relative;
      z-index: 2;
      top: -1px;
      left: -1px;
    }

    &:checked {
      color: var(--color-white-dark);
    }

    &:checked:before {
      content: '';
      display: inline-block;
      width: 1.9rem;
      height: 1.9rem;
      border-radius: 50%;
      color: var(--color-white-dark);
      border: 1.5px solid var(--color-secondary);
      visibility: visible;
      position: relative;
      z-index: 2;
      top: -2.5px;
      left: -2.8px;
    }

    &:checked:after {
      content: '';
      display: inline-block;
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      background-color: var(--color-secondary);
      visibility: visible;
      position: relative;
      z-index: 2;
      top: -1.95rem;
      right: -1.4px;
    }
  }
`;

export const RadioInputFix = styled(RadioInput)`
  &[type='radio']:checked:before {
    top: -3.5px;
    left: -4px;
  }

  &[type='radio']:checked:after {
    top: -2.05rem;
    right: -0.1px;
  }
`;

const RadioGroup = ({ num, onRadioChange }) => (
  <RadioContainer onChange={onRadioChange}>
    <RadioInput name={`rating${num}`} type="radio" value={1} />
    <RadioInput name={`rating${num}`} type="radio" value={2} />
    <RadioInput name={`rating${num}`} type="radio" value={3} />
    <RadioInput name={`rating${num}`} type="radio" value={4} />
    <RadioInput name={`rating${num}`} type="radio" value={5} />
  </RadioContainer>
);

export default RadioGroup;
