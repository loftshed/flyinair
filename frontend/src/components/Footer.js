import styled from "styled-components";

import logoImg from "../assets/air-sling.png";

const Footer = () => (
  <Wrapper>
    <Logo src={logoImg} />
    <Text>Now with less leg room!</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--color-light-blue);
  height: 60px;
  bottom: 0px;
`;
const Logo = styled.img`
  height: 100%;
`;
const Text = styled.p`
  color: var(--color-dark-blue);
  font-family: var(--font-heading);
  padding: 0px 20px;
  font-size: 36px;
  text-align: center;
  margin: 12px 0 0 24px;
`;

export default Footer;
