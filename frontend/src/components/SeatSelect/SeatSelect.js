import Plane from "./Plane";
import styled from "styled-components";
import FlightSelect from "./FlightSelect";

const SeatSelect = ({}) => {
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
            <input placeholder="First name"></input>
            <input placeholder="Last name"></input>
            <input placeholder="Email"></input>
            <button type="submit">Confirm</button>
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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid red;
  padding: 25px;
`;
