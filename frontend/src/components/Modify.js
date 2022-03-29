import styled from "styled-components";
import Plane from "./SeatSelect/Plane";
import DetailsInput from "./SeatSelect/DetailsInput";

const Modify = () => {
  return (
    <Wrapper>
      <Border>
        <Plane />
        <DetailsInput />
      </Border>
    </Wrapper>
  );
};

export default Modify;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: Kosugi;
`;

const Border = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: var(--main-width);
  justify-content: center;
  align-items: center;
  border-left: 3px dashed var(--color-yellow);
  border-right: 3px dashed var(--color-yellow);
`;
