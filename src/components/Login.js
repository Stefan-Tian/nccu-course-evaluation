import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './Text';
import Aux from './Aux';
import Button from './Button';
import ErrorPicture from '../img/errorPicture.png';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  padding: 4rem 2rem;
  top: 4.5rem;
  max-width: 30rem;
  right: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: var(--shadow-darker);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transform: translateZ(10rem);
  z-index: 100;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  font-size: 1.3rem;
  line-height: 1.5rem;
  padding: 3px;
  margin-bottom: 1.5rem;
  border: 0;
  border-bottom: 1px solid #000;
  width: 100%;

  &:focus {
    background-color: #f8f8f8;
  }
`;

const Modal = styled.div`
  position: absolute;
  z-index: 120;
  top: 50%;
  right: 50%;
  background-image: url(${ErrorPicture});
  width: 35rem;
  height: 30rem;
  transform: translate(50%, -50%);
`;

const CloseModal = styled.span`
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

const ModalBack = styled.div`
  position: absolute;
  z-index: 110;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

class Login extends Component {
  state = {
    account: '',
    password: '',
    error: false
  };

  handleSubmit = async () => {
    const { account, password } = this.state;
    if (account === '' || password === '') {
      this.setState({ error: true });
    }
    const email = `${this.state.account}@nccu.edu.tw`;
    const data = JSON.stringify({
      email,
      password
    });

    console.log(data);

    // const result = await axios.post("....");
    // if (result) {
    //   console.log("Successfully logged in!")
    // }
  };

  render() {
    return (
      <Aux>
        <Container>
          <Text md mb="1rem">
            登入/註冊
          </Text>
          <Text sm mb="0.8rem">
            學校帳號
          </Text>
          <Flex>
            <Input
              type="text"
              value={this.state.account}
              onChange={e => this.setState({ account: e.target.value })}
            />
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              @nccu.edu.tw
            </span>
          </Flex>
          <Text sm mb="0.8rem">
            密碼
          </Text>
          <Input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Button onClick={this.handleSubmit}>確認</Button>
        </Container>
        {this.state.error ? (
          <ModalBack>
            <CloseModal onClick={() => this.setState({ error: false })}>
              x
            </CloseModal>
            <Modal />
          </ModalBack>
        ) : null}
      </Aux>
    );
  }
}

export default Login;
