import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FlightSelect from "./SeatSelect/FlightSelect";

const Header = () => {
  const history = useHistory();
  return (
    <>
      <Wrapper>
        <CenteredDiv>
          <Logo onClick={() => history.push("/")}>FlyinAir✈️</Logo>
        </CenteredDiv>
      </Wrapper>
      <FlightSelect />
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-dark-blue);
  height: 90px;
  border-bottom: solid 2px white;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  width: var(--main-width);
  height: 100%;
  padding: 0px var(--main-padding);
  border-left: 3px dashed var(--color-yellow);
  border-right: 3px dashed var(--color-yellow);
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
