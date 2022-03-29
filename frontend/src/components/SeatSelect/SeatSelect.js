import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

//
import { AppContext } from "../AppContext";
import Plane from "./Plane";
import LoadingSpinner from "./LoadingSpinner";
import CancelSuccessModal from "../CancelSuccessModal";

const SeatSelect = () => {
  const {
    selectedFlight,
    selectedSeat,
    setReservationId,
    showCancelSuccessModal,
    setErrorMessage,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
          `/api/update-availability?flightNum=${selectedFlight}&seatId=${selectedSeat}&isAvailable=n`,
          {
            method: "PATCH",
          }
        );
        console.log(updateSeats);

        const { data } = await reservationResponse.json();
        console.log(data);

        if (data.insertedId) {
          setReservationId(data.insertedId);
          setLoading(false);
          history.push("/confirmed");
          return;
        }
      }
    } catch (err) {
      // console.log(err);
      setErrorMessage(err);
      history.push("");
    }
  };

  if (showCancelSuccessModal === true) {
    return <CancelSuccessModal />;
  }

  return (
    <Wrapper>
      <Borders>
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
                  <div>
                    <SelectASeat>SELECT</SelectASeat>
                    <SelectASeat>A</SelectASeat>
                    <SelectASeat>SEAT</SelectASeat>
                  </div>
                )}
              </SeatNum>
            </Seat>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
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
              {!loading && <SubmitButton type="submit" value="Confirm" />}
              {loading && (
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
          </div>
        </DetailsContainer>
      </Borders>
    </Wrapper>
  );
};

export default SeatSelect;

const SelectASeat = styled.p`
  font-size: 16px;
  color: var(--color-red);
  /* filter: drop-shadow(0.5px 1px 0px var(--color-medium-blue)); */
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  /* margin: 0 29.5%; */
  align-items: center;
  justify-content: center;
  font-family: Kosugi;
`;
const Borders = styled.div`
  display: flex;
  width: var(--main-width);
  justify-content: space-around;
  height: 100%;
  padding: 50px;
  gap: 35px;
  border-left: 3px dashed var(--color-yellow);
  border-right: 3px dashed var(--color-yellow);
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 575px;
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
    background-color: var(--color-orange);
    border-color: var(--color-yellow);
  }
  &:active {
    background-color: var(--color-red);
  }
`;
