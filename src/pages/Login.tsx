// Login.tsx
import React, { useState } from 'react';
import { Container, Box, Title, InputGroup, Label, Input, Button } from '../components';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';

const LoginBox = styled(Box)`
  max-width: 500px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <LoginBox>
        <Title>ログイン</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">ログイン</Button>
        </form>
      </LoginBox>
    </Container>
  );
};

export default Login;
