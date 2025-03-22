import styled from 'styled-components';
import {Box, Wrapper, Container } from '../components';

export const CustomWrapper = styled(Wrapper)`
  background-color: #f0f4f8;
`;

export const CustomContainer = styled(Container)`
  background-color: #f0f4f8;
`;

export const CustomBox = styled(Box)`
  padding: 30px;
  background-color: #f0f4f8;
`;

export const CustomTitle = styled.h2`
  font-size: 26px;
  color: #007bff;
  margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-height: 500px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;