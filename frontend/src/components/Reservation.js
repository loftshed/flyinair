import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import LoadingSpinner from "./SeatSelect/LoadingSpinner";

const Reservation = () => {
  const {
    reservationId,
    setReservationId,
    setCurrentReservation,
    currentReservation,
  } = useContext(AppContext);
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

  const handleDeleteReservation = async () => {
    try {
      const updateSeats = await fetch(
        `/api/update-availability?flightNum=${currentReservation.flight}&seatId=${currentReservation.seat}&isAvailable`,
        {
          method: "PATCH",
        }
      );
      console.log(updateSeats);
      const deleteReservation = await fetch(
        `/api/delete-reservation?reservationId=${reservationId}`,
        {
          method: "DELETE",
        }
      );
      if (deleteReservation.ok && updateSeats.ok) {
        setReservationId("");
        setCurrentReservation({});
        localStorage.clear("reservationId");
        console.log("Reservation deleted successfully.");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <Border>
          <LoadingSpinner />
        </Border>
      </div>
    );

  if (!loading) {
    const { _id, flight, seat, givenName, surname, email } = currentReservation;

    return (
      <Wrapper>
        <Border>
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
            <Button
              type="button"
              onClick={() => {
                handleDeleteReservation();
              }}
            >
              Cancel Booking
            </Button>
            <Button type="button">Modify Booking</Button>
          </Options>
        </Border>
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

  color: var(--color-dark-blue);
`;

const Border = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: var(--main-width);
  justify-content: center;
  align-items: center;
  border-left: 3px dashed var(--color-yellow);
  border-right: 3px dashed var(--color-yellow);
`;

const BookingContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  border: dashed 2px var(--color-dark-blue);
  border-radius: 5px;
  padding: 25px;
  width: 600px;
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
