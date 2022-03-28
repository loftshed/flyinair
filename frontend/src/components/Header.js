import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlightSelect from "./SeatSelect/FlightSelect";

const Header = () => {
  const history = useHistory();
  return (
    <>
      <Wrapper>
        <Logo onClick={() => history.push("/")}>FlyinAir✈️</Logo>
      </Wrapper>
      <FlightSelect />
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-dark-blue);
  height: 90px;
  padding: var(--padding-page) 48px;
  border-bottom: solid 2px white;
  @media screen and (min-width: 1080px) {
    padding: 0 30%;
  }
`;
const Logo = styled.div`
  transform: translateY(-2px);
  color: var(--color-lightest);
  font-family: "Fredoka One", cursive;
  text-shadow: -3px 0px var(--color-yellow);
  font-size: 60px;
  cursor: pointer;
`;

export default Header;
