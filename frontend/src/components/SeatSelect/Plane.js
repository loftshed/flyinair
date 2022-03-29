import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import LoadingSpinner from "../Anim/LoadingSpinner";

const Plane = () => {
  const { selectedFlight, setSelectedSeat, reservationId, setErrorMessage } =
    useContext(AppContext);
  const [seating, setSeating] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // "Loading" state could probably be refined...

  useEffect(() => {
    let isApiSubscribed = true;
    (async () => {
      try {
        setLoading(true);
        if (
          selectedFlight !== "" &&
          selectedFlight !== "Select" &&
          isApiSubscribed
        ) {
          const data = await fetch(`/api/get-flight?flight=${selectedFlight}`);
          const {
            flight: { seats },
          } = await data.json();
          setSeating(seats);
          setSelectedSeat("");
        }
        setLoading(false);
      } catch (err) {
        // console.log(err);
        setErrorMessage(err);
        history.push("");
      }
    })();
    return () => {
      isApiSubscribed = false; // try to find out why this works? edit: or doesn't?
    };
  }, [
    selectedFlight,
    reservationId,
    setSelectedSeat,
    history,
    setErrorMessage,
  ]);

  // Condensing render conditions into a single variable ///////////////////////////
  const showPlaceholder = !selectedFlight || selectedFlight === "Select";
  const showLoadingSpinner = (seating.length <= 0 && selectedFlight) || loading;
  const showSeating =
    seating && seating.length > 0 && selectedFlight !== "Select" && !loading;
  //////////////////////////////////////////////////////////////////////////////////

  return (
    <Wrapper>
      <Flight>
        {selectedFlight !== "Select" && !loading ? selectedFlight : ""}
      </Flight>
      <PlaneContainer>
        {showPlaceholder && (
          <Placeholder>Select a Flight to view seating.</Placeholder>
        )}
        {showLoadingSpinner && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        {showSeating &&
          seating.map((seat) => (
            <SeatWrapper key={`seat-${seat.id}`}>
              <label>
                {seat.isAvailable ? (
                  <>
                    <Seat
                      id={seat.id}
                      type="radio"
                      name="seat"
                      onChange={(ev) => {
                        setSelectedSeat(ev.target.id);
                      }}
                    />
                    <Available>{seat.id}</Available>
                  </>
                ) : (
                  <Unavailable>{seat.id}</Unavailable>
                )}
              </label>
            </SeatWrapper>
          ))}
      </PlaneContainer>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  box-shadow: 0px 0px 5px 0px #a8dadc;
  border-radius: 15px;
  height: fit-content;
`;

const Flight = styled.div`
  font-family: Kosugi;
  font-weight: 800;
  font-size: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-lightest);
  background-color: var(--color-light-blue);
  text-shadow: 4px 0px 0px var(--color-dark-blue),
    -4px 0px 0px var(--color-yellow);
  width: 100%;
  height: 60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  letter-spacing: 2px;
`;

const PlaneContainer = styled.ol`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 12px 10px;
  background: #fff;
  border-right: 15px solid var(--color-dark-blue);
  border-left: 15px solid var(--color-dark-blue);
  margin: 0px 24px 0px 24px;
  padding: 45px 0px 30px 5px;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: var(--color-orange);
  font-family: var(--font-heading);
  font-size: 32px;
  opacity: 0.5;
`;

const SeatWrapper = styled.li`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;
const Seat = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked {
    + span {
      background: var(--color-orange);
      color: #fff;
      font-weight: 700;
    }
  }
`;
const SeatNumber = styled.span`
  border-radius: 2px;
  color: var(--color-red);
  font-family: var(--font-body);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  transition: all ease 300ms;
`;
const Available = styled(SeatNumber)`
  background: #fff;
  border: 1px solid var(--color-dark-blue);
  cursor: pointer;

  &:checked,
  &:hover {
    background: var(--color-light-blue);
    color: #fff;
    font-weight: 700;
  }
`;
const Unavailable = styled(SeatNumber)`
  background: var(--color-yellow);
  cursor: not-allowed;
  opacity: 0.4;
`;

const Footer = styled.div`
  background-color: var(--color-light-blue);
  width: 100%;
  height: 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export default Plane;
