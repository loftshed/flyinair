import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

const Confirmation = () => {
  const { reservationId, currentReservation, setCurrentReservation } =
    useContext(AppContext);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(
          `/api/get-reservation?reservationId=${reservationId}`
        );
        const { reservation } = await data.json();
        setCurrentReservation(reservation);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setCurrentReservation, reservationId]);

  if (!currentReservation._id) return null;
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

const Heading = styled.h3`
  color: var(--color-medium-blue);
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

const Details = styled.ul`
  gap: 15px;
`;
const Item = styled.li`
  font-size: 20px;
`;
const ItemHeading = styled.span`
  font-weight: 600;
`;

export default Confirmation;
