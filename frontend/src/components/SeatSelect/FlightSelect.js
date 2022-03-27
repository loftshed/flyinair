import { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";

const FlightSelect = () => {
  const { availableFlights, setAvailableFlights, setSelectedFlight } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("/api/get-flights");
        const jsonifiedData = await data.json();
        setAvailableFlights(jsonifiedData.flights);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setAvailableFlights]);

  // console.log(availableFlights);

  return (
    <Wrapper>
      <CenteredDiv>
        <Heading>Flight Number:</Heading>
        <Selector
          name="flights"
          id="flights"
          onChange={(ev) => {
            setSelectedFlight(ev.target.value);
          }}
          defaultValue={"default"}
        >
          <option key={"default"}>Select</option>
          {availableFlights.map(({ _id }) => {
            return (
              <option key={_id} value={_id}>
                {_id}
              </option>
            );
          })}
        </Selector>
      </CenteredDiv>
    </Wrapper>
  );
};

export default FlightSelect;

const Heading = styled.h1`
  text-shadow: var(--color-red) 0px 1px 3px 3px;
  font-family: "Kosugi", cursive;
  font-size: 18px;
  border-radius: 5px;
  padding: 5px;
  background-color: var(--color-yellow);
`;

const Wrapper = styled.div`
  display: flex;
  font-family: "Concert One", cursive;
  justify-content: space-between;
  width: 100%;
  padding: 5px 24px;
  background-color: var(--color-light-blue);
  box-shadow: 0px 1px 1px 0px #a8dadc;
  height: 40px;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Selector = styled.select`
  font-family: Kosugi;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-dark-blue);
  height: 25px;
  border-radius: 5px;
  padding: 0px 5px;
  box-shadow: 0px 1px 1px 0px #a8dadc;
`;
