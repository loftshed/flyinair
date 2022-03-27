import { useContext } from "react";
import { useHistory } from "react-router-dom";

import Plane from "./Plane";
import styled from "styled-components";
import FlightSelect from "./FlightSelect";
import { AppContext } from "../AppContext";

const SeatSelect = () => {
  const { selectedFlight, selectedSeat, setReservationId } =
    useContext(AppContext);

  const history = useHistory();

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

        const {
          data: { insertedId },
        } = await reservationResponse.json();

        if (insertedId) {
          setReservationId(insertedId);
          console.log(insertedId);
          history.push("/confirmed");
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FlightSelect />
      <Wrapper>
        <div style={{ display: "flex" }}>
          <Plane />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <Heading>Select your seat & provide your information!</Heading>
            <div>
              <Seat>
                Selected seat:{" "}
                <span style={{}}>
                  {selectedSeat && selectedFlight !== "Select" ? (
                    <>{selectedSeat}</>
                  ) : (
                    <>■</>
                  )}
                </span>
              </Seat>
            </div>
            <Inputs onSubmit={handleSubmit}>
              <InputField
                type="text"
                htmlFor="firstName"
                name="firstName"
                placeholder="First name"
              />
              <InputField
                type="text"
                htmlFor="lastName"
                name="lastName"
                placeholder="Last name"
              />
              <InputField
                type="text"
                htmlFor="email"
                name="email"
                placeholder="Email"
              />
              <SubmitButton type="submit" value="Confirm" />
            </Inputs>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default SeatSelect;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Heading = styled.p`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-dark-blue);
  width: 58%;
  text-align: center;
`;

const Seat = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: var(--color-dark-blue);
  width: 100%;
  text-align: center;
`;

const Inputs = styled.form`
  display: flex;
  flex-direction: column;
  border: 4px solid var(--color-medium-blue);
  padding: 25px;
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
