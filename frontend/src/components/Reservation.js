import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import LoadingSpinner from "./SeatSelect/LoadingSpinner";

const Reservation = () => {
  const { reservationId, setCurrentReservation, currentReservation } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(
          `/api/get-reservation?reservationId=${reservationId}`
        );
        const { reservation } = await data.json();
        setCurrentReservation(reservation);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setCurrentReservation, reservationId]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
      </div>
    );

  if (!loading) {
    const { _id, flight, seat, givenName, surname, email } = currentReservation;

    return (
      <Wrapper>
        <BookingContainer>
          <Heading>Your reservation:</Heading>
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
        <Options>
          <Button>Cancel Booking</Button>
          <Button>Modify Booking</Button>
        </Options>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Kosugi;
  gap: 20px;
  color: var(--color-dark-blue);
`;

const BookingContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  border: dashed 2px var(--color-dark-blue);
  border-radius: 5px;
  padding: 25px;
  width: 534px;
`;

const Heading = styled.h3`
  color: var(--color-medium-blue);
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

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  width: 330px;
  /* border: dashed 2px var(--color-dark-blue); */
  /* padding: 10px; */
`;

const Button = styled.button`
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-yellow);
  font-family: inherit;
  letter-spacing: 1.5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-orange);
  }
`;

export default Reservation;
