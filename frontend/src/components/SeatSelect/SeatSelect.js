import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Plane from "./Plane";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import LoadingSpinner from "./LoadingSpinner";

const SeatSelect = () => {
  const { selectedFlight, selectedSeat, setReservationId } =
    useContext(AppContext);
  const [waiting, setWaiting] = useState(false);

  const history = useHistory();

  const window = selectedSeat.includes("A") || selectedSeat.includes("F");
  const middle = selectedSeat.includes("B") || selectedSeat.includes("E");
  const aisle = selectedSeat.includes("C") || selectedSeat.includes("D");

  const handleSubmit = async (ev) => {
    // TODO if incorrect data entered, highlight which field it came from
    ev.preventDefault();
    try {
      const { firstName, lastName, email } = ev.currentTarget.elements;

      const firstNameValid = firstName.value.length >= 1;
      const lastNameValid = lastName.value.length >= 1;
      const emailValid =
        email.value.indexOf("@") >= 1 &&
        email.value.indexOf(".") <= email.value.length - 3;
      if (firstNameValid && lastNameValid && emailValid) {
        setWaiting(true);
        const reservationResponse = await fetch("/api/add-reservation", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flight: selectedFlight,
            seat: selectedSeat,
            givenName: firstName.value,
            surname: lastName.value,
            email: email.value,
          }),
        });

        const updateSeats = await fetch(
          `/api/update-availability?flightNum=${selectedFlight}&seatId=${selectedSeat}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              seats: { id: selectedSeat, isAvailable: false },
            }),
          }
        );
        console.log(updateSeats);

        const { data } = await reservationResponse.json();
        console.log(data);

        if (data.insertedId) {
          setReservationId(data.insertedId);
          history.push("/confirmed");
          setWaiting(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", gap: "40px" }}>
        <Plane />
        <DetailsContainer>
          <div>
            <Seat>
              <SeatNum>
                {selectedSeat && selectedFlight !== "Select" ? (
                  <div>
                    {selectedSeat}
                    <p style={{ fontSize: "14px" }}>
                      {window && <>WINDOW</>}
                      {middle && <>MIDDLE</>}
                      {aisle && <>AISLE</>}
                    </p>
                  </div>
                ) : (
                  <div style={{ fontSize: "16px", color: "var(--color-red)" }}>
                    <p>SELECT</p>
                    <p>A</p>
                    <p>SEAT</p>
                  </div>
                )}
              </SeatNum>
            </Seat>
          </div>
          <Heading>Please provide your information:</Heading>
          <Inputs onSubmit={handleSubmit}>
            <InputField
              htmlFor="firstName"
              name="firstName"
              placeholder="First name"
            />
            <InputField
              htmlFor="lastName"
              name="lastName"
              placeholder="Last name"
            />
            <InputField htmlFor="email" name="email" placeholder="Email" />
            {!waiting && <SubmitButton type="submit" value="Confirm" />}
            {waiting && (
              <Spinner>
                <div style={{ transform: "translateY(1.5px)" }}>
                  <LoadingSpinner
                    size={"25px"}
                    color={"var(--color-lightest)"}
                  />
                </div>
              </Spinner>
            )}
          </Inputs>
        </DetailsContainer>
      </div>
    </Wrapper>
  );
};

export default SeatSelect;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 42px;
  border: 2px solid var(--color-yellow);
  background-color: var(--color-yellow);
  border-radius: 4px;
  padding: 0 12px;
  margin: 2.5px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  height: 100vh;
`;

const Heading = styled.p`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-dark-blue);
  text-align: center;
`;

const Seat = styled.div`
  font-family: Kosugi;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-dark-blue);
  width: 100%;
  justify-content: center;
`;

const SeatNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 40px;
  width: 100px;
  height: 100px;
  border: 4px solid;
  border-radius: 3px;
`;

const Inputs = styled.form`
  display: flex;
  flex-direction: column;
  border: 4px solid var(--color-medium-blue);
  padding: 25px;
  border-radius: 5px;
  &:active {
    outline: var(--color-dark-blue);
  }
`;

const InputField = styled.input`
  &:active {
    outline: var(--color-dark-blue);
  }
`;

const SubmitButton = styled.input`
  color: #fff;
  background-color: var(--color-yellow);
  cursor: pointer;

  &:hover {
    background-color: var(--color-red);
    border-color: var(--color-red);
  }
  &:active {
    background-color: yellow;
  }
`;
