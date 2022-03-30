import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import LoadingSpinner from "./Anim/LoadingSpinner";

const Confirmation = () => {
  const {
    reservationId,
    currentReservation,
    setCurrentReservation,
    setErrorMessage,
  } = useContext(AppContext);
  const [loading, setLoading] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let isApiSubscribed = true;
    (async () => {
      try {
        setLoading(true);
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

        setLoading(false);
      } catch (err) {
        // console.log(err);
        setErrorMessage(err);
        history.push("");
      }
    })();
    return () => {
      isApiSubscribed = false; // try to find out why this works
    };
  }, [setCurrentReservation, reservationId, history, setErrorMessage]);

  if (!currentReservation || loading)
    return (
      <NotLoaded>
        <Border>
          <LoadingSpinner />
        </Border>
      </NotLoaded>
    );

  const { _id, flight, seat, givenName, surname, email } = currentReservation;

  return (
    <>
      {!loading && (
        <Wrapper>
          <Border>
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
          </Border>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: Kosugi;
`;

const NotLoaded = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
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
`;

// contents of BookingContainer
const Heading = styled.h3`
  color: var(--color-medium-blue);
  user-select: none;
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
