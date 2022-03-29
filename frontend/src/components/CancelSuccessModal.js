import { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import LoadingSpinner from "./SeatSelect/LoadingSpinner";

const CancelSuccessModal = () => {
  const { setShowCancelSuccessModal } = useContext(AppContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const handleConfirm = () => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      setShowCancelSuccessModal(false);
    }, Math.floor(Math.random() * 1000));
  };

  return (
    <Wrapper>
      <Borders>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {showSpinner ? (
            <LoadingSpinner />
          ) : (
            <>
              <PlaneIcon />
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "var(--color-dark-blue)",
                }}
              >
                Your booking was cancelled successfully.
              </div>
              <Button
                onClick={() => {
                  handleConfirm();
                }}
              >
                Book a new flight
              </Button>
            </>
          )}
        </div>
      </Borders>
    </Wrapper>
  );
};

export default CancelSuccessModal;

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

const PlaneIcon = styled(MdOutlineAirplanemodeInactive)`
  width: 300px;
  height: 300px;
  color: var(--color-dark-blue);
`;

const Button = styled.button`
  border: none;
  font: inherit;
  font-size: 20px;
  padding: 10px;
  background-color: var(--color-yellow);
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-orange);
  }
  &:active {
    background-color: var(--color-red);
  }
`;
