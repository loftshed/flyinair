import { useEffect, useState } from "react";
import styled from "styled-components";

const FlightSelect = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("/api/get-flights");
        const jsonifiedData = await data.json();
        setFlights(jsonifiedData.flights);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  console.log(flights);

  return (
    <Wrapper>
      <h1>Flight Number:</h1>
      <select name="flights" id="flights">
        {flights.map(({ _id }) => {
          return <option value={_id}>{_id}</option>;
        })}
      </select>
    </Wrapper>
  );
};

export default FlightSelect;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0px 18px;
  background-color: #aa001e;
`;
