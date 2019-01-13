import styled from 'styled-components';
import ErrorPicture from '../img/errorPicture.png';

export const Modal = styled.div`
  position: absolute;
  z-index: 120;
  top: 50%;
  right: 50%;
  background-image: url(${ErrorPicture});
  width: 35rem;
  height: 30rem;
  transform: translate(50%, -50%);
`;

export const CloseModal = styled.span`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  color: white;
  position: absolute;
  top: 2rem;
  right: 4rem;
  font-size: 5rem;
  z-index: 112;
  cursor: pointer;
`;

export const ModalBack = styled.div`
  position: absolute;
  z-index: 110;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  min-width: 100vw;
  min-height: 100vh;
`;
