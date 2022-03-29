import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import MenuBar from "./SeatSelect/MenuBar";
import { AppContext } from "./AppContext";

const Header = () => {
  const { setSelectedFlight, setSelectedSeat } = useContext(AppContext);
  const history = useHistory();
  return (
    <>
      <Wrapper>
        <CenteredDiv>
          <Logo
            onClick={() => {
              history.push("/");
              setSelectedFlight("");
              setSelectedSeat("");
            }}
          >
            FlyinAir✈️
          </Logo>
        </CenteredDiv>
      </Wrapper>
      <MenuBar />
    </>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-dark-blue);
  height: 120px;
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
  font-size: 75px;
  cursor: pointer;
`;

export default Header;
