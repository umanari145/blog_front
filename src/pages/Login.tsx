// Login.tsx
import React, { useState } from 'react';
import { Container, Box, Title, InputGroup, Label, Input, Button } from '../components';
import styled from 'styled-components';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const LoginBox = styled(Box)`
  max-width: 500px;
`;

const Login: React.FC<LoginProps> = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
