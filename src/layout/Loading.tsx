import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 2s linear infinite;
`;

export const Loading = () => {
  return (
    <>
      <LoadingDiv />
    </>
  );
};
