import styled from "styled-components";
import { GiBackPain } from "react-icons/gi";

const Footer = () => (
  <Wrapper>
    <Logo />
    <Text>Now more cramped and expensive!</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--color-light-blue);
  height: fit-content;
  bottom: 0px;
  box-shadow: 0px 0px 2px 0px #a8dadc;
`;
const Logo = styled(GiBackPain)`
  color: var(--color-yellow);
  height: 40px;
  width: 40px;
`;
const Text = styled.p`
  color: var(--color-dark-blue);
  font-family: var(--font-heading);
  padding: 0px 20px;
  font-size: 36px;
  text-align: center;
  margin: 12px 0px;
`;

export default Footer;
