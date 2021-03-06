import styled from "styled-components";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

//
import { AppContext } from "../AppContext";
import LoadingSpinner from "../Anim/LoadingSpinner";

/*----------------------------------------------------------------------
| Area for entering user details, used  in SeatSelect.js and Modify.js |
----------------------------------------------------------------------*/

const DetailsInput = ({ type }) => {
  const {
    setReservationId,
    setErrorMessage,
    setLoading,
    loading,
    currentReservation,
    selectedFlight,
    selectedSeat,
  } = useContext(AppContext);
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
      const validated =
        firstNameValid && lastNameValid && emailValid && selectedSeat;

      let fetchResult;

      if (validated) {
        setLoading(true);

        if (type === "modify") {
          const releaseSeat = await fetch(
            `/api/update-availability?flightNum=${currentReservation.flight}&seatId=${currentReservation.seat}&isAvailable`,
            {
              method: "PATCH",
            }
          );
          console.log(releaseSeat);

          fetchResult = await fetch(
            `/api/update-reservation?reservationId=${currentReservation._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                flight: selectedFlight,
                seat: selectedSeat,
                givenName: firstName.value,
                surname: lastName.value,
                email: email.value,
              }),
            }
          );
          console.log(fetchResult);
        }
        // end of "modify"
        ////////

        if (type === "new") {
          fetchResult = await fetch("/api/add-reservation", {
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
        }

        const getNewSeat = await fetch(
          `/api/update-availability?flightNum=${selectedFlight}&seatId=${selectedSeat}&isAvailable=n`,
          {
            method: "PATCH",
          }
        );
        console.log(getNewSeat);

        const { insertedId, propsModified } = await fetchResult.json();

        if (insertedId) {
          setReservationId(insertedId);
          setLoading(false);
          history.push("/confirmed");
          return;
        }

        if (propsModified) {
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

  return (
    <Wrapper>
      <ModifyHeader>
        {type === "modify" ? "MODIFY YOUR BOOKING" : "CREATE A NEW BOOKING"}
      </ModifyHeader>
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
      <InputContainer>
        <Heading>
          {type === "new" && "Please enter your information"}
          {type === "modify" && "Please update your information"}
        </Heading>
        <Inputs onSubmit={handleSubmit}>
          {type === "new" ? (
            <>
              <InputField
                htmlFor="firstName"
                name="firstName"
                placeholder={"First name"}
              />
              <InputField
                htmlFor="lastName"
                name="lastName"
                placeholder={"Last name"}
              />
              <InputField htmlFor="email" name="email" placeholder={"Email"} />{" "}
            </>
          ) : (
            <>
              <InputField
                htmlFor="firstName"
                name="firstName"
                defaultValue={currentReservation.givenName}
              />
              <InputField
                htmlFor="lastName"
                name="lastName"
                defaultValue={currentReservation.surname}
              />
              <InputField
                htmlFor="email"
                name="email"
                defaultValue={currentReservation.email}
              />{" "}
            </>
          )}

          {!loading && <SubmitButton type="submit" value="Confirm" />}
          {loading && (
            <Spinner>
              <div style={{ transform: "translateY(1.5px)" }}>
                <LoadingSpinner size={"25px"} color={"var(--color-lightest)"} />
              </div>
            </Spinner>
          )}
        </Inputs>
      </InputContainer>
    </Wrapper>
  );
};

export default DetailsInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 575px;
  user-select: none;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  user-select: all;
  &:active {
    outline: var(--color-dark-blue);
  }
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

const SelectASeat = styled.p`
  font-size: 16px;
  color: var(--color-red);
  /* filter: drop-shadow(0.5px 1px 0px var(--color-medium-blue)); */
`;

const ModifyHeader = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: var(--color-red);
`;
