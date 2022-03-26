import { useState, useContext } from "react";

import Plane from "./Plane";
import styled from "styled-components";
import FlightSelect from "./FlightSelect";
import { AppContext } from "../AppContext";

const SeatSelect = () => {
  const { selectedFlight, selectedSeat } = useContext(AppContext);

  const handleSubmit = async (ev) => {
    // TODO if incorrect data entered, highlight which field it came from
    ev.preventDefault();
    try {
      const { firstName, lastName, email } = ev.currentTarget.elements;
      const reservationData = {
        flight: selectedFlight,
        seat: selectedSeat,
        givenName: firstName.value,
        surname: lastName.value,
        email: email.value,
      };
      const firstNameValid = firstName.value.length >= 1;
      const lastNameValid = lastName.value.length >= 1;
      const emailValid =
        email.value.indexOf("@") >= 1 &&
        email.value.indexOf(".") <= email.value.length - 3;
      if (firstNameValid && lastNameValid && emailValid) {
        const response = await fetch("/api/add-reservation", {
          method: "POST",
          headers: { "Content-Type": "application-json" },
          body: JSON.stringify(reservationData),
        });
        return response.json();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <FlightSelect />
      <h2>Select your seat and Provide your information!</h2>
      <div style={{ display: "flex" }}>
        <Plane />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
  );
};

export default SeatSelect;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inputs = styled.form`
  display: flex;
  flex-direction: column;
  border: 4px solid red;
  padding: 25px;
`;

const InputField = styled.input``;

const SubmitButton = styled.input`
  cursor: pointer;

  &:hover {
    background-color: pink;
  }
  &:active {
    background-color: yellow;
  }
`;
