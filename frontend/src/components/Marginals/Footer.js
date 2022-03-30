import styled from "styled-components";
import { GiBackPain, GiPathDistance, GiEarthAmerica } from "react-icons/gi";

const Footer = () => (
  <>
    <Wrapper>
      <Border>
        <Logo />
        <Text>
          Stretch your budget- <Test>not your legs!</Test>
        </Text>
      </Border>
    </Wrapper>
    <Earth />
    <Trail />
  </>
);

const Test = styled.div`
  display: inline-block;
  transform: skewX(-10deg);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--color-light-blue);
  height: fit-content;
  bottom: 0px;
  box-shadow: 0px 0px 2px 0px #a8dadc;
  user-select: none;
`;
const Logo = styled(GiBackPain)`
  color: var(--color-yellow);
  height: 40px;
  width: 40px;
`;
const Text = styled.div`
  color: var(--color-dark-blue);
  font-family: var(--font-heading);
  padding: 0px 20px;
  font-size: 36px;
  text-align: center;
  margin: 12px 0px;
`;
const Border = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--main-width);
  border-left: 3px dashed var(--color-lightest);
  border-right: 3px dashed var(--color-lightest);
`;

const Earth = styled(GiEarthAmerica)`
  color: #ede3cb;
  position: fixed;
  overflow: none;
  width: 996px;
  height: 996px;
  bottom: -300px;
  right: -300px;
  @media (max-width: 1280px) {
    right: -600px;
  }
`;
const Trail = styled(GiPathDistance)`
  color: #ede3cb;
  position: fixed;
  overflow: none;
  left: -350px;
  width: 996px;
  height: 996px;
  transform: rotate(-20deg);
  @media (max-width: 1280px) {
    left: -500px;
  }
`;

export default Footer;
