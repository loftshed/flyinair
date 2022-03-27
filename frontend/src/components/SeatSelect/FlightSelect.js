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
        <h1>Flight Number:</h1>
        <Selector
          name="flights"
          id="flights"
          onChange={(ev) => {
            setSelectedFlight(ev.target.value);
          }}
          defaultValue={"default"}
        >
          <option key={"default"}>Select a flight</option>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 45px;
  padding: 0px 18px;
  background-color: #aa001e;
`;

const CenteredDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const Selector = styled.select`
  font-family: Kosugi;
  font-size: 20px;
  height: 35px;
`;
