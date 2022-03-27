import styled from "styled-components";
import { ImSpinner3 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(ImSpinner3)`
  color: var(--color-dark-blue);
  animation: ${rotate} 2s linear infinite;
`;
