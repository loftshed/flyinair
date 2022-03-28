import styled from "styled-components";
import { useContext, useEffect } from "react";

import { AppContext } from "./AppContext";
import LoadingSpinner from "./SeatSelect/LoadingSpinner";

const Confirmation = () => {
  const { reservationId, currentReservation, setCurrentReservation } =
    useContext(AppContext);

  useEffect(() => {
    let isApiSubscribed = true;
    (async () => {
      try {
        if (isApiSubscribed) {
          const data = await fetch(
            `/api/get-reservation?reservationId=${reservationId}`
          );
          const { reservation } = await data.json();
          await setCurrentReservation(reservation);
          localStorage.setItem(
            "reservationId",
            JSON.stringify(`${reservationId}`)
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      isApiSubscribed = false; // try to find out why this works
    };
  }, [setCurrentReservation, reservationId]);

  if (!currentReservation._id)
    return (
      <NotLoaded>
        <LoadingSpinner />
      </NotLoaded>
    );
  const { _id, flight, seat, givenName, surname, email } = currentReservation;

  return (
    <Wrapper>
      <BookingContainer>
        <Heading>Your booking is confirmed!</Heading>
        <Details style={{ display: "flex", flexDirection: "column" }}>
          <Item>
            <ItemHeading>Booking ID</ItemHeading>: {_id}
          </Item>
          <Item>
            <ItemHeading>Passenger</ItemHeading>: {givenName} {surname}
          </Item>
          <Item>
            <ItemHeading>Contact</ItemHeading>: {email}
          </Item>
          <Item>
            <ItemHeading>Flight Number</ItemHeading>: {flight}
          </Item>
          <Item>
            <ItemHeading>Seat</ItemHeading>: {seat}
          </Item>
        </Details>
      </BookingContainer>
    </Wrapper>
  );
};

const NotLoaded = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: Kosugi;
`;

const BookingContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  border: dashed 2px var(--color-dark-blue);
  border-radius: 5px;
  padding: 25px;
`;

// contents of BookingContainer
const Heading = styled.h3`
  color: var(--color-medium-blue);
`;
const ItemHeading = styled.span`
  font-weight: 600;
`;
const Item = styled.li`
  font-size: 20px;
`;
const Details = styled.ul`
  gap: 15px;
`;

export default Confirmation;
