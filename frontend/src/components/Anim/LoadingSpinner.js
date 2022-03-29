import styled, { keyframes } from "styled-components";
import { ImSpinner3 } from "react-icons/im";

/*---------------------------
| Loading spinner animation |
---------------------------*/

const LoadingSpinner = ({ color, size }) => {
  return (
    <Spinner
      style={{ color: `${color}`, width: `${size}`, height: `${size}` }}
    />
  );
};

export default LoadingSpinner;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(ImSpinner3)`
  width: 60px;
  height: 60px;
  color: var(--color-dark-blue);
  animation: ${rotate} 2s linear infinite;
`;
