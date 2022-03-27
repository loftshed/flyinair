import { useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import styled from "styled-components";

const FlightSelect = () => {
  const {
    availableFlights,
    setAvailableFlights,
    setSelectedFlight,
    reservationId,
  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("/api/get-flights");
        const jsonifiedData = await data.json();
        setAvailableFlights(jsonifiedData.flights);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setAvailableFlights]);

  // console.log(availableFlights);

  return (
    <Wrapper>
      <div>
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
      </div>
      <Nav>
        {reservationId && (
          <ReservationInfo to="/view-reservation">
            Your Reservation
          </ReservationInfo>
        )}
      </Nav>
    </Wrapper>
  );
};

export default FlightSelect;

const Heading = styled.h1`
  text-shadow: var(--color-red) 0px 1px 3px 3px;
  font-family: "Kosugi", cursive;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
  background-color: var(--color-yellow);
`;

// const ReservationInfo = styled.button`
//   text-shadow: var(--color-red) 0px 1px 3px 3px;
//   font-family: "Kosugi", cursive;
//   font-size: 18px;
//   border: none;
//   border-radius: 5px;
//   padding: 5px;
//   background-color: var(--color-red);
//   cursor: pointer;
//   &:hover {
//     background-color: var(--color-orange);
//   }
// `;

const Wrapper = styled.div`
  display: flex;
  font-family: "Concert One", cursive;
  justify-content: space-between;
  width: 100%;
  padding: 5px 24px;
  background-color: var(--color-light-blue);
  box-shadow: 0px 1px 1px 0px #a8dadc;
  height: 40px;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Selector = styled.select`
  font-family: Kosugi;
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
  padding: 5px;
  background-color: var(--color-red);
  color: var(--color-lightest);

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
