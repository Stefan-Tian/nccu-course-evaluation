import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Text from './Text';
import Button from './Button';

const Input = styled.input`
  font-size: 2rem;
  line-height: 2.4rem;
  padding: 0.5rem;
  border: 0;
  background-color: var(--color-gray-light-2);
  border-radius: 4px;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const PasswordConfirmation = ({
  password,
  onPasswordChange,
  onPasswordConfirm
}) => (
  <Container>
    <Card>
      <Text md mb="3rem" style={{ textAlign: 'center' }}>
        密碼
      </Text>
      <Text sm mb="1.2rem">
        *上傳後資料將無法修改，請輸入密碼確認
      </Text>
      <Input value={password} onChange={onPasswordChange} type="password" />
      <Button onClick={onPasswordConfirm}>確認密碼</Button>
    </Card>
  </Container>
);

export default PasswordConfirmation;
