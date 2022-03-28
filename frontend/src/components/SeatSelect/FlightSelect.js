import { useEffect, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";
import styled, { keyframes } from "styled-components";

const FlightSelect = () => {
  const {
    availableFlights,
    setAvailableFlights,
    setSelectedFlight,
    reservationId,
    setReservationId,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

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
      } catch (err) {
        console.log(err);
      }
    })();
    setLoading(false);
  }, [setAvailableFlights, reservationId, setReservationId]);

  return (
    <Wrapper style={{ overflow: "hidden" }}>
      {!availableFlights[0] || loading ? (
        <div style={{ height: "40px" }}>
          <LoadingGradient />
        </div>
      ) : (
        <Content>
          <CenteredDiv>
            <Heading>Flight Number:</Heading>
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
          </CenteredDiv>

          <Nav>
            {!loading && (
              <ReservationInfo to="/view-reservation">
                Your Reservation
              </ReservationInfo>
            )}
          </Nav>
        </Content>
      )}
    </Wrapper>
  );
};

export default FlightSelect;

const Wrapper = styled.div`
  position: relative;
`;

const Content = styled.div`
  display: flex;
  font-family: "Concert One", cursive;
  justify-content: space-between;
  width: 100%;
  padding: 5px 45px;
  background-color: var(--color-light-blue);
  box-shadow: 0px 1px 1px 0px #a8dadc;
  height: 40px;
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 307px;
  gap: 10px;
`;

const Heading = styled.h1`
  text-shadow: var(--color-red) 0px 1px 3px 3px;
  font-family: "Kosugi";
  font-size: 18px;
  border-radius: 5px;
  padding: 5px 5px 5px 11px;
  letter-spacing: 3px;
  background-color: var(--color-yellow);
  text-shadow: -2px 0px var(--color-red);
`;

const scroll = keyframes`
0% {
  transform: translateX(0px)
}
100% {
  transform: translateX(-50%)
}
`;

const LoadingGradient = styled.div`
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
  animation: ${scroll} 2s linear infinite;
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
  justify-content: flex-end;
  align-items: center;
`;

const ReservationInfo = styled(NavLink)`
  text-shadow: var(--color-red) 0px 1px 3px 3px;
  font-family: "Kosugi", cursive;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-red);
  color: var(--color-lightest);
  padding: 5px 5px 5px 9px;
  letter-spacing: 3px;

  cursor: pointer;
  &:hover {
    background-color: var(--color-orange);
  }
  text-decoration: none;
  transition: all ease 100ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-orange);
    color: var(--color-lightest);
    border-color: var(--color-lightest);
  }
`;
