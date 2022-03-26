import { useState } from "react";

import Plane from "./Plane";
import styled from "styled-components";
import FlightSelect from "./FlightSelect";

const SeatSelect = () => {
  const [userData, setUserData] = useState({});
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
          <Inputs>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="First name"
            />
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Last name"
            />
            <input type="text" id="email" name="email" placeholder="Email" />
            <input
              onClick={(ev) => {
                ev.preventDefault();
              }}
              type="submit"
              value="Confirm"
            />
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
