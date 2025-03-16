// Login.tsx
import React, { useState } from 'react';
import { Container, Box, Title, InputGroup, Label, Input, Button } from '../components';
import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginBox = styled(Box)`
  max-width: 500px;
`;

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    login(email, password);
    navigate("/admin/"); 
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
