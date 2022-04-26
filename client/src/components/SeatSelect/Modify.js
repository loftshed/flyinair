import styled from "styled-components";
import Plane from "./Plane";
import DetailsInput from "./DetailsInput";

const Modify = () => {
  const inputType = "modify";
  return (
    <Wrapper>
      <Border>
        <Plane />
        <DetailsInput type={inputType} />
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
  display: flex;
  width: var(--main-width);
  justify-content: space-around;
  height: 100%;
  padding: 50px;
  gap: 35px;
  border-left: 3px dashed var(--color-yellow);
  border-right: 3px dashed var(--color-yellow);
`;
