import { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import LoadingSpinner from "../Anim/LoadingSpinner";

/*-----------------------------------------------------------
| Modal displayed after a booking has been cancelled        |
| not actually a modal now but was intending to make it one |
-----------------------------------------------------------*/

const CancelSuccessModal = () => {
  const { setShowCancelSuccessModal, setSelectedFlight } =
    useContext(AppContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const handleConfirm = () => {
    setShowSpinner(true);
    setSelectedFlight("");
    setTimeout(() => {
      setShowSpinner(false);
      setShowCancelSuccessModal(false);
    }, Math.floor(Math.random() * 1000));
  };

  return (
    <Wrapper>
      <Borders>
        <Modal>
          {showSpinner ? (
            <LoadingSpinner />
          ) : (
            <>
              <PlaneIcon />
              <Details>Your booking was cancelled successfully.</Details>
              <Button
                onClick={() => {
                  handleConfirm();
                }}
              >
                Book a new flight
              </Button>
            </>
          )}
        </Modal>
      </Borders>
    </Wrapper>
  );
};

export default CancelSuccessModal;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
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
  width: 200px;
  height: 200px;
  color: var(--color-dark-blue);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Details = styled.p`
  font-size: 20px;
  font-weight: 600;
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
