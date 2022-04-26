import { useContext } from "react";
import styled from "styled-components";

//
import { AppContext } from "../AppContext";
import Plane from "./Plane";
import CancelSuccessModal from "../Modal/CancelSuccessModal";
import DetailsInput from "./DetailsInput";

const SeatSelect = () => {
  const { showCancelSuccessModal } = useContext(AppContext);
  const inputType = "new";

  if (showCancelSuccessModal === true) {
    return <CancelSuccessModal />;
  }

  return (
    <Wrapper>
      <Borders>
        <Plane />
        <DetailsInput type={inputType} />
      </Borders>
    </Wrapper>
  );
};

export default SeatSelect;

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
  margin-top: 20px;
  overflow: hidden;
`;
