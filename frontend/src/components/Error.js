import styled from "styled-components";
import { RiBug2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <Message>Dang!</Message>
      <Bug />
      <Message>
        An error has occurred -- probably because of something you did.
      </Message>
      <StyledLink to="/">Click here to return home.</StyledLink>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Bug = styled(RiBug2Line)`
  width: 300px;
  height: 300px;
  color: var(--color-dark-blue);
`;

const Message = styled.h1`
  color: var(--color-dark-blue);
  width: 50%;
`;

const StyledLink = styled(Link)`
  color: #1d3557;
  text-decoration-line: none;
  padding-top: 25px;
  &:hover {
    text-decoration: underline solid #fb8500;
  }
`;
