import styled from "styled-components";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MenuBar from "../SeatSelect/MenuBar";
import { AppContext } from "../AppContext";
import { WiDayWindy } from "react-icons/wi";

import { ReactComponent as PlaneSvg } from "../../assets/plane.svg";

const Header = () => {
  const { setSelectedFlight, setSelectedSeat } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Wrapper>
        <BgDiv>
          <CenteredDiv>
            <>
              {/* cheeseball way of getting around annoying bug when clicking logo on seat select page */}
              {location.pathname === "/" && (
                <>
                  <div
                    style={{
                      display: "inherit",
                      justifyContent: "inherit",
                      alignItems: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <SpeedLines />
                    <Logo>FlyinAir</Logo>
                    <Plane />
                  </div>
                </>
              )}
              {location.pathname !== "/" && (
                <>
                  <div
                    style={{
                      display: "inherit",
                      justifyContent: "inherit",
                      alignItems: "inherit",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      history.push("/");
                      setSelectedFlight("");
                      setSelectedSeat("");
                    }}
                  >
                    <SpeedLines />
                    <Logo>FlyinAir</Logo>
                    <Plane />
                  </div>
                </>
              )}
            </>
          </CenteredDiv>
        </BgDiv>
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
  user-select: none;
`;
const SpeedLines = styled(WiDayWindy)`
  color: #fff;
  margin-left: -45px;
  height: 100px;
  width: 98px;
  margin-right: -20px;
  transform: scaleX(-1);
  color: var(--color-light-blue);
`;

const Plane = styled(PlaneSvg)`
  height: 80px;
  width: 80px;
  filter: drop-shadow(-2px 2px var(--color-yellow));
`;

const BgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-dark-blue);
  width: 100%;
  height: 100%;
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
