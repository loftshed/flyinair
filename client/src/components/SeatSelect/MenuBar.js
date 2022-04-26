import { useEffect, useContext, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import LoadingGradient from "../Anim/LoadingGradient";

/*----------------------------------------
| Menu bar displayed at bottom of Header |
----------------------------------------*/

const MenuBar = () => {
  const [loading, setLoading] = useState(false);
  const {
    availableFlights,
    setAvailableFlights,
    setSelectedFlight,
    reservationId,
    setReservationId,
    setErrorMessage,
    showCancelSuccessModal,
  } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch("/api/get-flights");
        const jsonifiedData = await data.json();
        setAvailableFlights(jsonifiedData.flights);
        if (!reservationId) {
          setReservationId(JSON.parse(localStorage.getItem("reservationId")));
        }
        setLoading(false);
      } catch (err) {
        // console.log(err);
        setErrorMessage(err);
        history.push("");
      }
    })();
  }, [
    setAvailableFlights,
    reservationId,
    setReservationId,
    setErrorMessage,
    history,
  ]);

  return (
    <Wrapper style={{ overflow: "hidden" }}>
      {!availableFlights[0] || loading ? (
        <Content>
          <LoadingGradient />
        </Content>
      ) : (
        <Content>
          <CenteredDiv>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {(location.pathname === "/" ||
                location.pathname === "/modify-reservation") &&
                !showCancelSuccessModal && (
                  <>
                    <FlightNumSelect>Flight Number:</FlightNumSelect>
                    <Selector
                      name="flights"
                      id="flights"
                      onChange={(ev) => {
                        setSelectedFlight(ev.target.value);
                      }}
                      defaultValue={"default"}
                    >
                      <option key={"default"}>Select</option>
                      {availableFlights.map(({ _id }) => {
                        return (
                          <option key={_id} value={_id}>
                            {_id}
                          </option>
                        );
                      })}
                    </Selector>
                  </>
                )}
            </div>
            <Nav>
              {!loading && reservationId && (
                <ReservationInfo to="/view-reservation">
                  Your Reservation
                </ReservationInfo>
              )}
            </Nav>
          </CenteredDiv>
        </Content>
      )}
    </Wrapper>
  );
};

export default MenuBar;

const Wrapper = styled.div`
  position: relative;
  user-select: none;
  /* & > * {
    font-family: "Kosugi";
  } */
`;

const Content = styled.div`
  display: flex;
  font-family: "Concert One", cursive;
  justify-content: center;
  background-color: var(--color-light-blue);
  box-shadow: 0px 1px 1px 0px #a8dadc;
  height: 40px;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px var(--main-padding);
  align-items: center;
  width: var(--main-width);
  gap: 10px;
  border-left: 3px dashed var(--color-lightest);
  border-right: 3px dashed var(--color-lightest);
`;

const FlightNumSelect = styled.h1`
  text-shadow: var(--color-red) 0px 1px 3px 3px;
  font-family: "Kosugi";
  font-size: 18px;
  border-radius: 5px;
  padding: 5px 5px 5px 11px;
  letter-spacing: 3px;
  background-color: var(--color-yellow);
  text-shadow: -2px 0px var(--color-red);
`;

const Selector = styled.select`
  font-family: Kosugi;
  letter-spacing: 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-dark-blue);
  height: 25px;
  border-radius: 5px;
  padding: 0px 5px;
  box-shadow: 0px 1px 1px 0px #a8dadc;
`;

////

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const ReservationInfo = styled(NavLink)`
  font-family: "Kosugi", cursive;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-yellow);
  color: var(--color-lightest);
  padding: 5px 5px 5px 9px;
  letter-spacing: 3px;
  text-shadow: 2px 0px var(--color-red);
  text-decoration-line: none;
  transition: all ease 100ms;

  cursor: pointer;
  &:hover {
    background: var(--color-orange);
    border-color: var(--color-lightest);
    color: var(--color-lightest);
  }
  &:active {
    background-color: var(--color-red);
  }
`;
