import styled, { keyframes } from "styled-components";

const LoadingGradient = ({ color, size }) => {
  return (
    <>
      <Gradient />
    </>
  );
};

export default LoadingGradient;

const scroll = keyframes`
0% {
  transform: translateX(0px)
}
100% {
  transform: translateX(-50%)
}
`;

const Gradient = styled.div`
  position: absolute;
  background: rgb(168, 218, 220);
  background: linear-gradient(
    90deg,
    rgba(168, 218, 220, 1) 0%,
    rgba(104, 120, 142, 1) 50%,
    rgba(168, 218, 220, 1) 100%
  );
  width: 1000%;
  height: 40px;
  box-shadow: 0px 1px 1px 0px #a8dadc;
  animation: ${scroll} 1s linear infinite;
`;
