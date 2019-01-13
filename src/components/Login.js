import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Text from './Text';
import Aux from './Aux';
import Button from './Button';
import Card from './Card';
import { AccountInfoConsumer } from './AccoutInfo.context';
import { Modal, ModalBack, CloseModal } from './Modal';

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${({ mb }) => mb};
`;

const Input = styled.input`
  border: 0;
  background-color: var(--color-gray-light-2);
  padding: 1rem;
  font-size: 1.8rem;
  line-height: 2.4rem;
  border-radius: 4px;
  margin-bottom: ${({ mb }) => mb};
  font-weight: bold;

  &::placeholder {
    color: var(--color-gray-light);
  }
`;

// const Modal = styled.div`
//   position: absolute;
//   z-index: 120;
//   top: 50%;
//   right: 50%;
//   background-image: url(${ErrorPicture});
//   width: 35rem;
//   height: 30rem;
//   transform: translate(50%, -50%);
// `;

// const CloseModal = styled.span`
//   display: inline-block;
//   width: 2rem;
//   height: 2rem;
//   color: white;
//   position: absolute;
//   top: 2rem;
//   right: 4rem;
//   font-size: 5rem;
//   z-index: 112;
//   cursor: pointer;
// `;

const StyledCard = styled(Card)`
  margin-top: 8rem;
  max-width: 50rem;
  padding-top: 3rem 1rem 3rem 2rem;
`;

const Mail = styled.span`
  display: inline-block;
  font-size: 2rem;
  line-height: 2.4rem;
  font-weight: bold;
`;

// const ModalBack = styled.div`
//   position: absolute;
//   z-index: 110;
//   background-color: rgba(0, 0, 0, 0.6);
//   top: 0;
//   right: 0;
//   width: 100vw;
//   height: 100vh;
// `;

const Clickable = styled.h4`
  font-size: 1.8rem;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
`;

const Sep = styled.h5`
  font-size: 1.5rem;
  line-height: 1.8rem;
  margin: 0 1.2rem 0.2rem 1.2rem;
`;

class Login extends Component {
  state = {
    actionType: 'login',
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

    if (this.state.actionType === 'signup') {
      const result = await axios.post('http://localhost:3111/create-user', {
        email,
        password
      });

      this.props.context.setCurrentAccount(result.data.email);

      const signUpResult = await axios.post('http://localhost:9999/signUp', {
        account: email,
        password,
        creatAccount: true
      });

      console.log(signUpResult);

      this.props.history.push('/');
    } else if (this.state.actionType === 'login') {
      const result = await axios.post('http://localhost:3111/login', {
        email,
        password
      });

      this.props.context.setCurrentAccount(result.data.email);
      this.props.history.push('/');
    }
  };

  render() {
    const { actionType } = this.state;
    return (
      <Aux>
        <StyledCard>
          <Text lg mb="3rem" style={{ textAlign: 'center' }}>
            {actionType === 'login'
              ? '登入'
              : actionType === 'signup'
              ? '註冊'
              : '錢包地址'}
          </Text>
          {actionType === 'address' ? (
            <Aux>
              <Text md mb="0.5rem">
                請輸入錢包地址
              </Text>
              <Input
                type="text"
                value={this.state.account}
                onChange={e => this.setState({ account: e.target.value })}
              />
            </Aux>
          ) : (
            <Aux>
              <Text md mb="0.5rem">
                學校帳號
              </Text>
              <Flex mb="3.6rem">
                <Input
                  type="text"
                  value={this.state.account}
                  onChange={e => this.setState({ account: e.target.value })}
                />
                <Mail>@nccu.edu.tw</Mail>
              </Flex>
              <Text md mb="0.5rem">
                密碼
              </Text>
              <Input
                mb="3.6rem"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Aux>
          )}
          <Button onClick={this.handleSubmit} mb="3rem">
            確認送出
          </Button>
          <Flex style={{ alignSelf: 'center' }}>
            {actionType === 'login' ? (
              <Clickable
                onClick={() => this.setState({ actionType: 'signup' })}
              >
                註冊
              </Clickable>
            ) : null}
            {actionType === 'signup' ? (
              <Clickable onClick={() => this.setState({ actionType: 'login' })}>
                登入
              </Clickable>
            ) : null}
            {actionType !== 'signup' && actionType !== 'login' ? (
              <Clickable onClick={() => this.setState({ actionType: 'login' })}>
                登入
              </Clickable>
            ) : null}
            <Sep>或</Sep>
            {actionType === 'address' ? (
              <Clickable
                onClick={() => this.setState({ actionType: 'signup' })}
              >
                註冊
              </Clickable>
            ) : (
              <Clickable
                onClick={() => this.setState({ actionType: 'address' })}
              >
                自備錢包地址
              </Clickable>
            )}
          </Flex>
        </StyledCard>
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

const MapLogin = props => (
  <AccountInfoConsumer>
    {context => <Login context={context} {...props} />}
  </AccountInfoConsumer>
);

export default MapLogin;
